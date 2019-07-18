import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Keyboard } from 'react-native';
import { initRootNavigation as irn } from '../screens/index';

export const initRootNavigation = irn;

export const pushView = function({ screenId, passProps, title, componentId }) {
	Keyboard.dismiss();
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
					background: {
						color: '#5B3C88',
					},
					backButton: {
						color: 'white',
						visible: true,
					},
				},
			},
		},
	});
};

/// this component does not add a menu button, it only makes it work when clicked

export const withMenuButton = function(Component) {
	return class withMenuButton extends React.Component {
		componentDidMount() {
			this.navigationEventListener = Navigation.events().bindComponent(this);
		}

		componentWillUnmount() {
			if (this.navigationEventListener) {
				this.navigationEventListener.remove();
			}
		}

		navigationButtonPressed({ buttonId }) {
			if (buttonId !== 'sideMenuButton') {
				return;
			}
			Navigation.mergeOptions('drawerMenu', {
				sideMenu: {
					left: {
						visible: true,
					},
				},
			});
		}

		render() {
			return <Component {...this.props} />;
		}
	};
};
