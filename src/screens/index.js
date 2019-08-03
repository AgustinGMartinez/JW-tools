import React from 'react';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { MAIN_COLOR } from '../utils/constants';

const store = configureStore();

const withRedux = Component => {
	const wrapper = props => {
		return (
			<Provider store={store}>
				<Component {...props} />
			</Provider>
		);
	};
	wrapper.options = Component.options;
	return wrapper;
};

export function registerScreens() {
	Navigation.registerComponent('jw-tools.SideDrawer', () =>
		withRedux(require('./SideDrawer/SideDrawer').default)
	);
	Navigation.registerComponent('jw-tools.Search', () =>
		withRedux(require('./Search/Search').default)
	);
	Navigation.registerComponent('jw-tools.Chapter', () =>
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
	Navigation.registerComponent('jw-tools.Principles', () =>
		withRedux(require('./Principles/Principles').default)
	);
	Navigation.registerComponent('jw-tools.Lessons', () =>
		withRedux(require('./Lessons/Lessons').default)
	);
	Navigation.registerComponent('jw-tools.Bible', () =>
		withRedux(require('./Bible/Bible').default)
	);
	Navigation.registerComponent('jw-tools.Book', () =>
		withRedux(require('./Book/Book').default)
	);
}

export function initRootNavigation({
	screenId,
	withBibleButton,
	withMenuButton,
}) {
	Promise.all([
		withMenuButton ? Icon.getImageSource('ios-menu', 30) : null,
		withBibleButton ? Icon.getImageSource('ios-book', 30) : null,
	]).then(([menuIcon, bibleIcon]) => {
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
							children: [
								{
									component: {
										name: screenId,
										passProps: {
											menuIcon,
											bibleIcon,
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

	// so it's smooth but only after startup
	// Navigation.setDefaultOptions({
	// 	animations: {
	// 		setRoot: {
	// 			alpha: {
	// 				from: 0,
	// 				to: 1,
	// 				duration: 500,
	// 			},
	// 		},
	// 	},
	// });
}
