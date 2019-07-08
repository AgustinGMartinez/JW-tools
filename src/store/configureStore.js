import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import places from './reducers/places';

const reducers = combineReducers({ places });

const composeEnhancers = __DEV__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	: false || compose;

const configureStore = () => {
	return createStore(
		reducers,
		composeEnhancers(applyMiddleware(ReduxThunk, logger))
	);
};

export default configureStore;
