import React from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { MAIN_COLOR } from '../utils/constants';

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
	Navigation.registerComponent('jw-tools.ChapterView', () =>
		withRedux(require('./Chapter/Chapter').default)
	);
	Navigation.registerComponent('jw-tools.Preaching', () =>
		withRedux(require('./Preaching/Preaching').default)
	);
	Navigation.registerComponent('jw-tools.BibleCombos', () =>
		withRedux(require('./BibleCombos/BibleCombos').default)
	);
	Navigation.registerComponent('jw-tools.Settings', () =>
		withRedux(require('./Settings/Settings').default)
	);
	Navigation.registerComponent('jw-tools.Truths', () =>
		withRedux(require('./Truths/Truths').default)
	);
	Navigation.registerComponent('jw-tools.Teaching', () =>
		withRedux(require('./Teaching/Teaching').default)
	);
}

export function initRootNavigation({ screenId, title }) {
	Promise.all([Icon.getImageSource('ios-menu', 30)]).then(([menuIcon]) => {
		Navigation.setRoot({
			root: {
				sideMenu: {
					left: {
						stack: {
							children: [
								{
									component: {
										name: 'jw-tools.SideDrawer',
										id: 'drawerMenu',
										options: {
											topBar: {
												title: {
													text: 'JW tools',
													color: 'white',
													fontWeight: 'bold',
												},
												background: {
													color: MAIN_COLOR,
												},
											},
										},
									},
								},
							],
						},
					},
					center: {
						stack: {
							// stacks, the last one is the current page for this stack
							children: [
								{
									component: {
										name: screenId,
										options: {
											topBar: {
												title: {
													text: title,
													color: 'white',
												},
												background: {
													color: MAIN_COLOR,
												},
												leftButtons: [
													{
														id: 'sideMenuButton',
														icon: menuIcon,
														color: 'white',
													},
												],
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
