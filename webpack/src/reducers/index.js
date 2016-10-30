import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {arrSeatsReducer, selectSeatReducer} from './seatsReducer';
import {arrUsersReducer, selectUserReducer} from './usersReducer'

const rootReducer = combineReducers({
	arrSeatsReducer,
	selectSeatReducer,
	arrUsersReducer,
	selectUserReducer,
    ajaxCallsInProgress
});

export default rootReducer;
