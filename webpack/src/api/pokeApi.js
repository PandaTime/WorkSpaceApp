import fetch from 'isomorphic-fetch';

class PokemonApi {
    static getPokemonsList(url) {
        return fetch(url).then((res)=>res.json());
    }
	static getPokemonsData(url){
		return fetch(url).then((res)=>res.json());
	}
}
export default PokemonApi;
