import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Keyboard } from 'react-native';
import { initRootNavigation } from '../screens/index';
import { MAIN_COLOR } from './constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { setOpenerId } from '../actions/navigationActions';

export { Navigation };

export { initRootNavigation };

export const pushView = function({
	screenId,
	passProps,
	title,
	componentId,
	subtitle = undefined,
	withBibleButton = false,
	withChapterButton = false,
}) {
	Keyboard.dismiss();
	if (withBibleButton || withChapterButton) {
		Icon.getImageSource('ios-book', 30).then(push);
	} else push();

	function push(bibleIcon = null) {
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
							visible: true,
						},
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
							...(withChapterButton
								? [
										{
											id: 'chapterButton',
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
						console.warn('1');
						// pushView({ screenId: 'jw-tools.Bible' });
					} else if (buttonId === 'chapterButton') {
						console.warn(this.state.childData);
						// pushView({ screenId: 'jw-tools.Bible' });
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
