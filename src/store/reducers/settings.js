import { SET_GLOBAL_FONTSIZE } from '../../utils/constants';
import normalize from '../../utils/normalizeText';

const initialState = {
	fontSize: normalize(20),
};

const reducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case SET_GLOBAL_FONTSIZE:
			newState.fontSize = normalize(action.data);
			return newState;
		default:
			return newState;
	}
};

export default reducer;
