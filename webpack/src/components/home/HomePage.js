import React from 'react';
//import {Link} from 'react-router';
import { connect } from 'react-redux';
import {loadPokemons} from '../../actions/loadPokemonsActions';

class HomePage extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        
    }

    render() {
		console.log(Header)
        return (
			<div>123</div>
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

export default connect(mapStateToProps, {loadPokemons})(HomePage);

//export default HomePage;
