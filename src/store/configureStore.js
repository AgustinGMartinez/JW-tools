import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import settings from './reducers/settings';
import navigation from './reducers/navigation';
import { AsyncStorage } from 'react-native';
import { STORAGE_FONTSIZE, SET_GLOBAL_FONTSIZE } from '../utils/constants';

const reducers = combineReducers({ settings, navigation });

const composeEnhancers = __DEV__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	: false || compose;

const configureStore = () => {
	const store = createStore(
		reducers,
		composeEnhancers(applyMiddleware(ReduxThunk, logger))
	);

	getInitialValuesFromStorage(store);

	return store;
};

const getInitialValuesFromStorage = store => {
	AsyncStorage.getItem(STORAGE_FONTSIZE).then(size => {
		if (size) {
			store.dispatch({
				type: SET_GLOBAL_FONTSIZE,
				data: Number(size),
			});
		}
	});
};

export default configureStore;
