import React from 'react';
import { connect } from 'react-redux';
import {loadPokemons} from '../../../actions/loadPokemonsActions';


class Canvas extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
			<div>
				123
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
export default Canvas;
//export default connect(mapStateToProps, {loadPokemons})(Canvas);

//export default HomePage;
