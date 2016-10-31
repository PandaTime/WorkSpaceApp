import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';


class Search extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="search-box">
				<div>Search</div>
				<div></div>
				<div>
					<div className="input-group">
						<input type="text" className="form-control" aria-label="..."/>

						<div className="input-group-btn">
							<button type="button" className="btn btn-default search-element-input" >w/ or w/0<span className="caret"></span></button>
						</div>
						<ul className={classNames('dropdown-menu info-box-search react-toggle hidden')}>
							<li><a>w/  used Seats</a></li>
							<li><a>w/o used Seats</a></li>
						</ul>
					</div>
				</div>
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
//export default Search;
export default connect(mapStateToProps, {})(Search);

