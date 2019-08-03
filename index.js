import { Navigation } from 'react-native-navigation';
import { registerScreens, initRootNavigation } from './src/screens';

registerScreens();

// Inicializamos este tipo de navegacion
Navigation.events().registerAppLaunchedListener(() => {
	initRootNavigation({
		screenId: 'jw-tools.Bible',
		withMenuButton: true,
		withBibleButton: true,
	});
});
