import React from 'react';
//import {Link} from 'react-router';
import {NotificationSystem} from 'react-notification-system';
import { connect } from 'react-redux';
import Canvas from './main-blocks/canvasElement';
import Info from './main-blocks/InfoElement';
import Search from './main-blocks/SearchElement';

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

//export default connect(mapStateToProps, {loadPokemons})(HomePage);

export default HomePage;
