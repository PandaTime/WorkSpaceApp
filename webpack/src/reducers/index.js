import {combineReducers} from 'redux';
import {pokemonsReducer, pokemonsDataReducer, pokemonsNextGetReducer} from './pokemonsReducer';
import {toggleFavoriteReducer} from './toggleFavoriteReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import {arrSeatsReducer, selectSeatReducer} from './seatsReducer';

const rootReducer = combineReducers({
    pokemonsReducer,
	pokemonsDataReducer,
    pokemonsNextGetReducer,
    toggleFavoriteReducer,
	arrSeatsReducer,
	selectSeatReducer,
    ajaxCallsInProgress
});

export default rootReducer;
