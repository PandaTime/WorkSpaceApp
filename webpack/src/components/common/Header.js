import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
//import LoadingDots from './LoadingDots';
//{loading && <LoadingDots interval={100} dots={20}/>}
const Header = () => {
    return (
        <nav>
            <IndexLink to="/pokemons" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/pokemons/favorite" activeClassName="active">Favorite</Link>
            
        </nav>
    );
};


export default Header;
