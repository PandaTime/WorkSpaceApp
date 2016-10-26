import React from 'react';
import { connect } from 'react-redux';
import {loadPokemons} from '../../../actions/loadPokemonsActions';


class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: '',
            context: ''
        };
    }
    componentDidMount(){
        this.setState({canvas : this.refs.canvas, context: this.refs.canvas.getContext('2d')});
    }
    render() {
        var canvas = this.state.canvas,
            context = this.state.context;
        if(canvas){
            context.font = '38pt Arial';
            context.fillStyle = 'cornflowerblue';
            context.strokeStyle = 'blue';
            context.fillText("Hello Canvas", canvas.width/2 - 150,
                canvas.height/2 + 15);
            context.strokeText("Hello Canvas", canvas.width/2 - 150,
                canvas.height/2 + 15 );
        }
        return (
            <canvas id="canvas" width="800" height="500" ref="canvas">Canvas not supported</canvas>
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
export default connect(mapStateToProps, {loadPokemons})(Canvas);

//export default HomePage;
