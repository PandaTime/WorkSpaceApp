import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {selectUser, updateUserLocation} from '../../../../actions/usersActions';
import {addNewSeat, updateSeatUser, deleteSeat} from '../../../../actions/seatsActions';
import ConfirmCheck from './confirmCheck';


class AssignUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optShow : false,
            showAssignedUsersFn : false,
            temp_seat_id: 'TEMP_SEAT',
			confirmUserAssign: false
        };
        this.toggleUserOptions = this.toggleUserOptions.bind(this);
		this.confirmAssignment = this.confirmAssignment.bind(this);
    }
    toggleUserOptions(){
        this.setState({optShow:!this.state.optShow})
    }
    showAssignedUsersFn(show){
        this.setState({showAssignedUsersFn : show, optShow : false});
    }
	confirmAssignment(){
		this.setState({confirmUserAssign: true});
	}
    assignUser(id){
		this.setState({confirmUserAssign: false});
        var seat = {id};
        var user = Object.assign({}, this.props.selectedUser);
        user.seat = seat;
        // owning seat by a user(Seat: userid);
        this.props.updateSeatUser({id:id, assignedTo: {
            id: this.props.selectedUser.id,
            firstName: this.props.selectedUser.firstName,
            surName: this.props.selectedUser.surName
        }});
        // assigning user to a seat(User: seatid);
        this.props.updateUserLocation({id: this.props.selectedUser.id, seat});
        // changing selected user
        this.props.selectUser(user);
        // deleting temp seat
        this.unhoverSeat(id);
        // hiding unneeded tabs
        this.toggleUserOptions();
        this.props.toggleUserOptions();
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
        var showAssigned = this.state.showAssignedUsersFn,
            temp_seat_id = this.state.temp_seat_id;
        var users = this.props.users.map((v, i)=>{
            if(v.id.startsWith(temp_seat_id)) return;
			var name = v.firstName + ' ' + v.surName;
            if(showAssigned)
				return (<li key={i} className="list-group-item" onClick={this.confirmAssignment}><div className="select-user-name">{name}</div><div className="select-user-seat">{v.seat.id ? v.seat.id : 'No seat assigned'}.</div></li>);
            else if(!v.seat.id)
                return (<li key={i} className="list-group-item" onClick={this.confirmAssignment}><div className="select-user-name">{name}</div> <div className="select-user-seat">No seat assigned.</div></li>);
        });

        return (
            <div>
                <div className="info-select-user">
                    <div className="search-element-exit pointer-cursor" onClick={this.props.toggleFormShow}>X</div>
                    <div>Seat: {this.props.hoverSeatID}</div>
                    <div className="form-box">
						<div className="input-group ">
							<input type="text" className="form-control" aria-label="..."/>
							<div className="input-group-btn">
								<button type="button" className="btn btn-default search-element-input" onClick={this.toggleUserOptions}>{this.state.showAssignedUsersFn ? 'w/' : 'w/o'}<span className="caret"></span></button>
							</div>
							<ul className={classNames('dropdown-menu info-box-search react-toggle', this.state.optShow ? '' : 'hidden')}>
								<li><a onClick={this.showAssignedUsersFn.bind(this, true)}>w/ assigned Users</a></li>
								<li><a onClick={this.showAssignedUsersFn.bind(this, false)}>w/o assigned Users</a></li>
							</ul>
						</div>
						<ConfirmCheck />
                        <ul className="list-group">
                            {users[0] ? users : 'There\'re no available users'}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        seats: state.arrSeatsReducer,
        selectedSeat: state.selectSeatReducer,
        users: state.arrUsersReducer,
        selectedUser: state.selectUserReducer
    };
}
//export default Information;
export default connect(mapStateToProps, {addNewSeat, updateSeatUser, deleteSeat, selectUser, updateUserLocation})(AssignUser);

