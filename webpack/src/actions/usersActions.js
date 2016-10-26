import * as types from './actionTypes';

export function addToFavoriteSuccess(pokemon) {
    return {type: types.ADD_FAVORITE, pokemon};
}
export function delFromFavoriteSuccess(pokemonID) {
    return {type: types.DEL_FAVORITE, pokemonID};
}

export function addToFavorite(pokemon){
    return function(dispatch) {
        dispatch(addToFavoriteSuccess(pokemon));
    };
}
export function delFromFavorite(pokemonID){
    return function(dispatch) {
        dispatch(delFromFavoriteSuccess(pokemonID));
    };
}