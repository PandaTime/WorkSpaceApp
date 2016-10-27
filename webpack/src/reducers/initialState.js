import defaultValues from './../config';
import {getFavoritePokemons} from './../api/localstorageAPI';

export default {
    favoritePokemons: getFavoritePokemons(),
	seats: [],
	selected: {},
    pokemons: [],
	pokemonsDataList: {},
    nextPokeList: defaultValues.initialPokemons,
    ajaxCallsInProgress: 0
};
