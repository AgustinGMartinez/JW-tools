import { CHANGE_SIDEDRAWER_OPENER_ID } from '../../utils/constants';

const initialState = {
	openerId: '',
};

const reducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case CHANGE_SIDEDRAWER_OPENER_ID:
			newState.openerId = action.data;
			return newState;
		default:
			return newState;
	}
};

export default reducer;
