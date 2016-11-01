import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {addNewSeat, deleteSeat} from '../../../actions/seatsActions';

class Search extends React.Component {
    constructor(props){
        super(props);
		this.state = {
			optShow : false,
			showUsed : false,
			selectBy: 'users',
			temp_seat_id: 'TEMP_SEAT'
		};
		this.toggleSeatOptions = this.toggleSeatOptions.bind(this);
    }
	showUsedSeatsFn(selectBy, ifAll){
		this.setState({showUsed : ifAll, selectBy, optShow : false});
	}
	toggleSeatOptions(){
		this.setState({optShow:!this.state.optShow})
	}
	hoverSeat(x, y, id){
		var seat = {
			x, y,
			id: this.state.temp_seat_id + id,
			fillStyle: 'rgba(255, 0, 0, 1)'
		};
		this.props.addNewSeat(seat);
	}
	unhoverSeat(id){
		this.props.deleteSeat(this.state.temp_seat_id + id);
	}
    render() {
		var showUsed = this.state.showUsed,
			temp_seat_id = this.state.temp_seat_id;
		var list = [];
		if(this.state.selectBy == 'users'){
			list = this.props.users.map((v, i)=>{
				if(showUsed)
					return (<div key={i}>{v.firstName} {v.surName} - <span className="add-info">{v.seat.id ? v.seat.id : 'Don\'t have seat'}</span></div>);
				else if(!v.seat.id)
					return (<div key={i}>{v.firstName} {v.surName} - <span className="add-info">{v.seat.id ? v.seat.id : 'Don\'t have seat'}</span></div>);
			});
		}else if(this.state.selectBy == 'seats'){
			list = this.props.seats.map((v, i)=>{
				if(v.id.startsWith(temp_seat_id)) return;
				if(showUsed)
					return (<div key={i}>{v.id}</div>);
				else if(!v.assignedTo.id)
					return (<div key={i}
								 onMouseEnter={this.hoverSeat.bind(this, v.x, v.y, v.id)}
								 onMouseOut={this.unhoverSeat.bind(this, v.id)}>{v.id}</div>);
			});
		}
		return (
            <div className="search-box">
				<div>Search</div>
				<div></div>
				<div>
					<div className="input-group">
						<input type="text" className="form-control" aria-label="..."/>
						<div className="input-group-btn">
							<button type="button" className="btn btn-default search-element-input" onClick={this.toggleSeatOptions}>
								{this.state.selectBy == 'users' ? (this.state.showUsed ? 'All Users' : 'Non-assigned Users') : (this.state.showUsed ? 'All Seats' : 'Free Seats')}
							<span className="caret"></span></button>
						</div>
						<ul className={classNames('dropdown-menu search-box-search react-toggle', this.state.optShow ? '' : 'hidden')}>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'seats', false)}>Free Seats</a></li>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'users', false)}>Non-assigned Users</a></li>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'seats', true)}>All Seats</a></li>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'users', true)}>All Users</a></li>
						</ul>
					</div>
					<div>
						{list[0] ? list : 'No seats are available'}
					</div>
				</div>
			</div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
		users: state.arrUsersReducer,
		selectedUser: state.selectUserReducer,
		seats: state.arrSeatsReducer,
		selectedSeat: state.selectSeatReducer
    };
}
//export default Search;
export default connect(mapStateToProps, {addNewSeat, deleteSeat})(Search);

