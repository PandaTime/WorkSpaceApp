import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import defaultValues from './../../config';
import { addToFavorite, delFromFavorite } from '../../actions/toggleFavoriteActions';

class ItemElement extends React.Component {
    constructor(props){
        super(props);
        this.toggleFavorite = this.toggleFavorite.bind(this);
        this.state = {favorite : this.props.isFavorite};
	}
	componentDidMount() {
        //this.props.loadPokemons();
    }
    componentWillReceiveProps(nextProps){
        //console.log(123, nextProps);
    }
    toggleFavorite(){
        var x = {};
        x[this.props.data.url] = this.props.data;
        this.state.favorite ? this.props.delFromFavorite(this.props.data.url) : this.props.addToFavorite(x);
        this.setState({favorite : !this.state.favorite});
    }
    render() {
		var id = this.props.data.url;
		var pokData = this.props.dataList[id] || {};
		var types = (pokData.types || []).map((v)=>{
			return(<span key={v.type.url} className={classNames('label', v.type.name)}>{v.type.name}</span>)		
		});
		var imgStyle = pokData.id ? {
		  backgroundImage: 'url(' + defaultValues.imgUrl + pokData.id +'.png)',
		  backgroundRepeat: 'no-repeat',
		  backgroundPosition: 'center',
		  backgroundSize: 'cover',
		} : {};
        return (
            <div className="col-md-3 pokemon">
                <div style={imgStyle} className='pokemon-image'></div>
                <h2>{this.props.data.name}</h2>
                <div className="pokemon-type-list">{types}</div>
                <div className="btn btn-warning" onClick={this.toggleFavorite}>{this.state.favorite ?  'Del from favorite' : 'Add to favorite'}</div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        dataList: state.pokemonsDataReducer
    };
}

export default connect(mapStateToProps, {addToFavorite, delFromFavorite})(ItemElement);

