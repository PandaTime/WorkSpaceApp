import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {arrSeatsReducer, selectSeatReducer} from './seatsReducer';
import {arrUsersReducer, selectUserReducer} from './usersReducer';
import {changeShownReducer} from './blocksReducer';

const rootReducer = combineReducers({
	arrSeatsReducer,
	selectSeatReducer,
	arrUsersReducer,
	selectUserReducer,
	changeShownReducer,
    ajaxCallsInProgress
});

export default rootReducer;
