import React from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

const store = configureStore();

const withRedux = Component => props => {
	return (
		<Provider store={store}>
			<Component {...props} />
		</Provider>
	);
};

export function registerScreens() {
	Navigation.registerComponent('jw-tools.SideDrawer', () =>
		withRedux(require('./SideDrawer/SideDrawer').default)
	);
	Navigation.registerComponent('jw-tools.Search', () =>
		withRedux(require('./Search/Search').default)
	);
	Navigation.registerComponent('jw-tools.BibleView', () =>
		withRedux(require('./Bible/Bible').default)
	);
}

export function initTabBasedNavigation() {
	Promise.all([
		Icon.getImageSource('md-map', 30),
		Icon.getImageSource('ios-share-alt', 30),
		Icon.getImageSource('ios-menu', 30),
	]).then(([icon1, icon2, icon3]) => {
		Navigation.setRoot({
			root: {
				sideMenu: {
					left: {
						component: {
							name: 'jw-tools.SideDrawer',
							id: 'drawerMenu',
						},
					},
					center: {
						stack: {
							// stacks, the last one is the current page for this stack
							children: [
								{
									component: {
										name: 'jw-tools.Search',
										options: {
											topBar: {
												title: {
													text: 'Inicio',
													color: 'white',
												},
												leftButtons: [
													{
														id: 'sideMenuButton',
														icon: icon3,
														color: 'white',
													},
												],
												background: {
													color: '#5B3C88',
												},
											},
										},
									},
								},
							],
						},
					},
				},
			},
		});
	});
}
