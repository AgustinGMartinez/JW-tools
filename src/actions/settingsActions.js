import { SET_GLOBAL_FONTSIZE, STORAGE_FONTSIZE } from '../utils/constants';
import { AsyncStorage } from 'react-native';

export const setFontSize = value => dispatch => {
	AsyncStorage.setItem(STORAGE_FONTSIZE, String(value)).then(() => {
		dispatch({
			type: SET_GLOBAL_FONTSIZE,
			data: value,
		});
	});
};
