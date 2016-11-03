import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {updateSeatInfo} from '../../../actions/seatsActions';

import SelectElement from './body-blocks/selectElement'
import {changeShown} from '../../../actions/showActions';

class Information extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSelectElementFrom: false,
			swapToInfo: {searchElement: true, infoElement: false}
        };
        this.toggleSeatFormShow = this.toggleSeatFormShow.bind(this);
    }
    assignSeat(assign){
        if(assign)
            this.toggleSeatFormShow();
        else
            console.log('delete');
    }
    toggleSeatFormShow(){
        this.setState({showSelectElementFrom : !this.state.showSelectElementFrom});
    }
    render() {
        var selectedSeat = this.props.selectedSeat;
        var selectedUser = this.props.selectedUser;
		
		var data;
		// We have only seat selected. In case both seat and user is selected - we're showing user info 
		console.log('selectedUser', selectedUser);
		if(selectedSeat.id){
			data = (
				<table className="table">
					<tbody>
						<tr>
							<td>Seat ID: </td>
							<td>{selectedSeat.id}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Seat Name:</td>
							<td>{selectedSeat.name}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Assigned to:</td>
							<td>{selectedSeat.assignedTo.id ? (selectedSeat.assignedTo.firstName + ' ' + selectedSeat.assignedTo.surName) : 'No user is assigned'}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Floor:</td>
							<td>{selectedSeat.floor}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Color:</td>
							<td>{selectedSeat.fillStyle}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Size:</td>
							<td>{selectedSeat.radius}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
					</tbody>
				</table>
			);
		}else if(selectedUser.id){
			data = (
				<table className="table">
					<tbody>
						<tr>
							<td>Employee ID:</td>
							<td>{selectedUser.id}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>First Name:</td>
							<td>{selectedUser.firstName}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Surname:</td>
							<td>{selectedUser.surName}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Taken seat name:</td>
							<td>{selectedUser.seat.name || 'No seat is taken'}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
						<tr>
							<td>Taken seat ID:</td>
							<td>{selectedUser.seat.id || 'No seat is taken'}</td>
							<td><span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true"></span></td>
						</tr>
					</tbody>
				</table>
			);
		}else{
			data =(
				<div>No User or Seat is selected.</div>
			)
		}
        return (
            <div className="info-box">
				{data}
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
export default connect(mapStateToProps, {updateSeatInfo, changeShown})(Information);

