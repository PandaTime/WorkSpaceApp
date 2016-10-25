import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function pokemonsReducer(state = initialState.pokemons, action) {
    switch (action.type) {
        case types.LOAD_POKEMONS_SUCCESS:
            return [
                ...state,
                ...action.pokemons.results.map((v)=>Object.assign({}, v))
            ];
        default:
            return state;
    }
}

export function pokemonsDataReducer(state = initialState.pokemonsDataList, action) {
    switch (action.type) {
        case types.LOAD_POKEMONS_DATA_SUCCESS:
			var el = {};
			el[action.url] = action.data;
            return Object.assign(Object.assign({}, state), el);
		default:
            return state;
    }
}

export function pokemonsNextGetReducer(state = initialState.nextPokeList, action) {
    switch (action.type) {
        case types.LOAD_POKEMONS_NEXT_LINK:
            return action.url;
        default:
            return state;
    }
}