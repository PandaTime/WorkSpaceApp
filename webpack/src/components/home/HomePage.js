import React from 'react';
//import {Link} from 'react-router';
import { connect } from 'react-redux';
import {loadPokemons} from '../../actions/loadPokemonsActions';
import Canvas from './visualization/canvasElement';
import Info from './InfoElement';
import Search from './SearchElement';

class HomePage extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        
    }
    
    render() {
        return (
            <div>
			    <Canvas />
                <Info />
                <Search />
            </div>
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
