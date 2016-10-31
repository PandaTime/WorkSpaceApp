import React from 'react';
//import {Link} from 'react-router';
import {NotificationSystem} from 'react-notification-system';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Canvas from './main-blocks/canvasElement';
import Info from './main-blocks/InfoElement';
import Search from './main-blocks/SearchElement';

import {changeShown} from '../../actions/showActions';

class HomePage extends React.Component {
    constructor(props){
        super(props);
		
    }
	navBarHandler(value){
		var res = {
			infoElement: false,
			searchElement: false
		}
		if(value == 'search'){
			res.searchElement = true;
		}else if(value =='info'){
			res.infoElement = true;
		}
		this.props.changeShown(res);
	}
    render() {
        return (
            <div>
			    <Canvas />
				<ul className="nav nav-tabs col-md-3 nav-menu-info-search">
				  <li className={classNames(this.props.showData.searchElement ? 'active' : '', 'pointer-cursor')} onClick={this.navBarHandler.bind(this, 'search')}><a>Search</a></li>
				  <li className={classNames(this.props.showData.infoElement ? 'active' : 'pointer-cursor')} onClick={this.navBarHandler.bind(this, 'info')}><a>Information</a></li>
				</ul>
				<div className={classNames(this.props.showData.infoElement ? '' : 'hidden')}>
					<Info />
				</div>
				<div className={classNames(this.props.showData.searchElement ? '' : 'hidden')}>
					<Search />
				</div>
            </div>			
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
		showData: state.changeShownReducer
    };
}

export default connect(mapStateToProps, {changeShown})(HomePage);

//export default HomePage;
