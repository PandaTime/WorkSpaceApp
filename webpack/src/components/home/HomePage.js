import React from 'react';
//import {Link} from 'react-router';
import { connect } from 'react-redux';
import ItemElement from './../common/ItemElement.js';
import {loadPokemons} from '../../actions/loadPokemonsActions';


class HomePage extends React.Component {
    constructor(props){
        super(props);
		this.loadMoar = this.loadMoar.bind(this);
    }
    componentDidMount(){
        console.log(this.props.pokemons);
        if(!this.props.pokemons[0])
            this.loadPokemons(this.props.nextPokeList);
    }
    componentWillReceiveProps(nextProps){
        
    }
    loadMoar(){
        this.loadPokemons(this.props.nextPokeList);
		console.log("MOAARRR!");
	}
    loadPokemons(url){
        this.props.loadPokemons(url);
    }
    render() {
        const favorites = Object.keys(this.props.favoriteList || {}) || [];
        const pokemons = (this.props.pokemons || []).map((v, i)=>{
            return (<ItemElement key={i} data={v} isFavorite={favorites.indexOf(v.url)!=-1}/>);
        });
        return (
            <div className="jumbotron">
				{pokemons}
				<div className="btn btn-primary btn-lg" onClick={this.loadMoar}>MOAR</div>
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
