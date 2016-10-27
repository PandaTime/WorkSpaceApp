import defaultValues from '../components/home/initValues';

export function getFavoritePokemons(){
    return JSON.parse(localStorage.getItem(defaultValues.favoritePokStorage)) || {};
}
export function saveFavoritePokemons(data){
    localStorage.setItem(defaultValues.favoritePokStorage, JSON.stringify(data));
}