import {combineReducers} from 'redux';
import {pokemonsReducer, pokemonsDataReducer, pokemonsNextGetReducer} from './pokemonsReducer';
import {toggleFavoriteReducer} from './toggleFavoriteReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    pokemonsReducer,
	pokemonsDataReducer,
    pokemonsNextGetReducer,
    toggleFavoriteReducer,
    ajaxCallsInProgress
});

export default rootReducer;
