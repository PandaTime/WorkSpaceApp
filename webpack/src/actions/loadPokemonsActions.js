import * as types from './actionTypes';
import pokeApi from '../api/pokeApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPokemonsSuccess(pokemons) {
    return { type: types.LOAD_POKEMONS_SUCCESS, pokemons};
}
export function loadPokemonsDataSuccess(data, url){
	return { type: types.LOAD_POKEMONS_DATA_SUCCESS, data, url};
}
export function changePokemonsNextUrl(url){
    return { type: types.LOAD_POKEMONS_NEXT_LINK, url};
}


export function loadPokemons(url) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return pokeApi.getPokemonsList(url).then(pokemons => {
            dispatch(loadPokemonsSuccess(pokemons));
			// loading pokemons data
			pokemons.results.forEach((v)=>{dispatch(loadPokemonData(v.url))});
            // changing url
            dispatch(changePokemonsNextUrl(pokemons.next));
        }).catch(error => {
            throw(error);
        });
    };
}

function loadPokemonData(url){
	return function(dispatch) {
        dispatch(beginAjaxCall());
        return pokeApi.getPokemonsData(url).then(pokemon => {
            dispatch(loadPokemonsDataSuccess(pokemon, url));
        }).catch(error => {
            throw(error);
        });
    };
}