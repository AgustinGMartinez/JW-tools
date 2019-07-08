import { Navigation } from 'react-native-navigation';
import { registerScreens, initTabBasedNavigation } from './src/screens';

registerScreens();

// Inicializamos este tipo de navegacion
Navigation.events().registerAppLaunchedListener(() => {
	initTabBasedNavigation();
});
