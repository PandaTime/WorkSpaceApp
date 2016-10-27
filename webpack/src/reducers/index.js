import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {arrSeatsReducer, selectSeatReducer} from './seatsReducer';

const rootReducer = combineReducers({
	arrSeatsReducer,
	selectSeatReducer,
    ajaxCallsInProgress
});

export default rootReducer;
