import { CHANGE_SIDEDRAWER_OPENER_ID } from '../utils/constants';

export const setOpenerId = id => dispatch => {
	dispatch({
		type: CHANGE_SIDEDRAWER_OPENER_ID,
		data: id,
	});
};
