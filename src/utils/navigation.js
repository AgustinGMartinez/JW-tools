import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Keyboard } from 'react-native';
import { initRootNavigation } from '../screens/index';
import { MAIN_COLOR } from './constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { setOpenerId } from '../actions/navigationActions';
import bible from './bible';

export { Navigation };

export { initRootNavigation };

export const pushView = function({
	screenId,
	passProps,
	title,
	componentId,
	subtitle = undefined,
	withBibleButton = false,
	withBookButton = false,
	withMenuButton = false,
	hideBackButton = false,
}) {
	Keyboard.dismiss();
	if (withBibleButton || withBookButton || withMenuButton) {
		Promise.all([
			withMenuButton ? Icon.getImageSource('ios-menu', 30) : null,
			withBibleButton || withBookButton
				? Icon.getImageSource('ios-book', 30)
				: null,
		]).then(push);
	} else push([]);

	function push([menuIcon, bibleIcon]) {
		Navigation.push(componentId, {
			component: {
				name: screenId,
				passProps: passProps,
				options: {
					topBar: {
						title: {
							text: title,
							color: 'white',
						},
						subtitle: {
							text: subtitle,
							color: 'white',
						},
						background: {
							color: MAIN_COLOR,
						},
						backButton: {
							color: 'white',
							visible: !hideBackButton, // actually is always hidden if there are leftButtons
						},
						leftButtons: [
							...(withMenuButton
								? [
										{
											id: 'sideMenuButton',
											icon: menuIcon,
											color: 'white',
										},
								  ]
								: []),
						],
						rightButtons: [
							...(withBibleButton
								? [
										{
											id: 'bibleButton',
											icon: bibleIcon,
											color: 'white',
										},
								  ]
								: []),
							...(withBookButton
								? [
										{
											id: 'bookButton',
											icon: bibleIcon,
											color: 'white',
										},
								  ]
								: []),
						],
					},
				},
			},
		});
	}
};

export const setStackRoot = ({
	stackId,
	screenId,
	withBibleButton,
	withMenuButton,
}) => {
	Navigation.mergeOptions('drawerMenu', {
		sideMenu: {
			left: {
				visible: false,
			},
		},
	});
	Promise.all([
		withMenuButton ? Icon.getImageSource('ios-menu', 30) : null,
		withBibleButton ? Icon.getImageSource('ios-book', 30) : null,
	]).then(([menuIcon, bibleIcon]) => {
		Navigation.setStackRoot(stackId, [
			{
				component: {
					name: screenId,
					passProps: {
						menuIcon,
						bibleIcon,
					},
					options: {
						animations: {
							push: {
								enable: false,
							},
						},
					},
				},
			},
		]);
	});
};

/// this component does not add a menu button, it only makes it work when clicked

export const withMenuButtons = function(options) {
	return function(Component) {
		const mapDispatchToProps = { setOpenerId };
		return connect(
			null,
			mapDispatchToProps
		)(
			class withMenuButtons extends React.Component {
				static options = Component.options;

				state = { childData: null };

				componentDidMount() {
					this.navigationEventListener = Navigation.events().bindComponent(
						this
					);
				}

				componentDidAppear() {
					this.props.setOpenerId(this.props.componentId);
				}

				componentWillUnmount() {
					if (this.navigationEventListener) {
						this.navigationEventListener.remove();
					}
				}

				navigationButtonPressed({ buttonId }) {
					if (buttonId === 'sideMenuButton') {
						Navigation.mergeOptions('drawerMenu', {
							sideMenu: {
								left: {
									visible: true,
								},
							},
						});
					} else if (buttonId === 'bibleButton') {
						pushView({
							screenId: 'jw-tools.Bible',
							componentId: this.props.componentId,
							withMenuButton: true,
						});
					} else if (buttonId === 'bookButton') {
						const { childData } = this.state;
						const book = childData.split('-')[0];
						pushView({
							screenId: 'jw-tools.Book',
							passProps: { book },
							title: bible.getBookDisplayName(book),
							withBibleButton: true,
							componentId: this.props.componentId,
						});
					}
				}

				receiveData = data => {
					this.setState({ childData: data });
				};

				render() {
					return (
						<Component {...this.props} sendDataToWrapper={this.receiveData} />
					);
				}
			}
		);
	};
};
