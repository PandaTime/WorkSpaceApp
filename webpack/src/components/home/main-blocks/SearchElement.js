import React from 'react';
import { connect } from 'react-redux';

//import {newUser} from '../../../actions/usersActions';
//import {newUser} from '../../../actions/seatsActions';


class Search extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="search-box">Search</div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        pokemons: state.pokemonsReducer,
        nextPokeList: state.pokemonsNextGetReducer,
        favoriteList: state.toggleFavoriteReducer
    };
}
export default Search;
//export default connect(mapStateToProps, {loadPokemons})(Canvas);

