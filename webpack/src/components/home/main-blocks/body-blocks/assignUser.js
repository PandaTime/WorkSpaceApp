import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {selectUser, updateUserLocation} from '../../../../actions/usersActions';
import {updateSeatUser, deleteSeat} from '../../../../actions/seatsActions';
import ConfirmCheck from './confirmCheck';


class AssignUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optShow : false,
            showAssignedUsersFn : false,
            temp_seat_id: 'TEMP_SEAT',
			confirmUserAssign: false,
            selectedUserId: '',
            confirmText: '',
			hoverSeatName: ''
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
	confirmAssignment(userName, id){
		var hoverSeatName =  this.props.seats.filter((v)=>v.id === this.props.hoverSeatID)[0];
		console.log(hoverSeatName);
		this.setState({
            confirmUserAssign: true,
            selectedUserId: id,
			hoverSeatName: hoverSeatName,
            confirmText: 'Assign ' + userName + ' to ' + hoverSeatName + '?'
        });
	}
    rejectUserAssignment(){
        this.setState({
            confirmUserAssign: false,
            selectedUserId: '',
            confirmText: ''
        })
    }
    assignUser(){
		this.setState({confirmUserAssign: false});
		var user = {
			id: this.state.selectedUserId,
			seat: {
				id: this.props.hoverSeatID,
				firstName: this.state.hoverSeatName.firstName,
				surName: this.state.hoverSeatName.surName
			}
		}
		console.log('users', user);
		// assigning user to a seat
		this.props.updateUserLocation(user);
		// occupying seat by a user
		this.props.updateSeatUser({
			id:this.props.hoverSeatID, assignedTo: {
				id: this.state.hoverSeatName.id,
				firstName: this.state.hoverSeatName.firstName,
				surName: this.state.hoverSeatName.surName
			}
		});
		console.log('123123', this.state.hoverSeatName);
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
				return (<li key={i} className="list-group-item" onClick={this.confirmAssignment.bind(this, name, v.id)}><div className="select-user-name">{name}</div><div className="select-user-seat">{v.seat.id ? v.seat.name : 'No seat assigned'}</div></li>);
            else if(!v.seat.id)
                return (<li key={i} className="list-group-item" onClick={this.confirmAssignment.bind(this, name, v.id)}><div className="select-user-name">{name}</div> <div className="select-user-seat">No seat assigned</div></li>);
        });

        return (
            <div>
                <div className="info-select-user">
                    <div className="search-element-exit pointer-cursor" onClick={this.props.toggleFormShow}>X</div>
                    <div>Seat: {this.props.hoverSeatID}</div>
                    <div className="form-box">
						<div className="input-group">
							<input type="text" className="form-control" aria-label="..."/>
							<div className="input-group-btn">
								<button type="button" className="btn btn-default search-element-input" onClick={this.toggleUserOptions}>{this.state.showAssignedUsersFn ? 'w/' : 'w/o'}<span className="caret"></span></button>
							</div>
							<ul className={classNames('dropdown-menu info-box-search react-toggle', this.state.optShow ? '' : 'hidden')}>
								<li><a onClick={this.showAssignedUsersFn.bind(this, true)}>w/ assigned Users</a></li>
								<li><a onClick={this.showAssignedUsersFn.bind(this, false)}>w/o assigned Users</a></li>
							</ul>
						</div>
                        <div className={classNames(this.state.confirmUserAssign ? '' : 'hidden')}>
						    <ConfirmCheck text={this.state.confirmText} accept={this.assignUser.bind(this)} reject={this.rejectUserAssignment.bind(this)}/>
                        </div>
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
export default connect(mapStateToProps, {updateSeatUser, deleteSeat, selectUser, updateUserLocation})(AssignUser);

