import React from 'react';
import { connect } from 'react-redux';
import {loadPokemons} from '../../actions/loadPokemonsActions';


class Information extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="info-box">Info</div>
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
export default Information;
//export default connect(mapStateToProps, {loadPokemons})(Canvas);

