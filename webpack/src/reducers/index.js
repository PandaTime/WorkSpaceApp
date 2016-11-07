import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {arrSeatsReducer, selectSeatReducer} from './seatsReducer';
import {arrUsersReducer, selectUserReducer} from './usersReducer';
import {changeShownReducer} from './blocksReducer';
import {dataSourceReducer, authericationReducer} from './adminReducer';

const rootReducer = combineReducers({
	arrSeatsReducer,
	selectSeatReducer,
	arrUsersReducer,
	selectUserReducer,
	changeShownReducer,
	dataSourceReducer,
	authericationReducer,
    ajaxCallsInProgress
});

export default rootReducer;
