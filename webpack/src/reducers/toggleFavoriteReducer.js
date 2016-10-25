import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {saveFavoritePokemons} from './../api/localstorageAPI';

export function toggleFavoriteReducer(state = initialState.favoritePokemons, action) {
    switch (action.type) {
        case types.ADD_FAVORITE:
            var res = Object.assign(Object.assign({}, state), action.pokemon);
            saveFavoritePokemons(res);
            return res;
        case types.DEL_FAVORITE:
            var res = Object.assign({}, state);
            delete res[action.pokemonID];
            saveFavoritePokemons(res);
            return res;
        default:
            return state;
    }
}
