import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {updateSeatInfo} from '../../../../actions/seatsActions';
import {changeShown} from '../../../../actions/showActions';
import dataHandler from '../../dataHandler';
import ConfirmCheck from './confirmCheck';

class ModifyForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showConfirm: false,  // variable to show confirmation pop-up;
			modifyRecord: false, // false - undo changes; true - modify record;
			confirmText: '',     // confirmation text that we show in confirm window;
			getProps: false, 	 // allowing state updation from nextProps
			// seat
			seatId: '', 
			seatName: '',
			seatColor: '',
			seatFloor:'',
			seatSize: ''
        };
		//seat 
		this.handleSeatNameChange = this.handleSeatNameChange.bind(this);
    }
	componentWillUpdate(nextProps){
		// to avoid inf loop;
		if(!this.state.getProps && nextProps.selectedSeat.id == this.state.seatId) return;
		
		if(nextProps.selectedSeat.id){
			this.setState({
				getProps: false,
				seatId: nextProps.selectedSeat.id,
				seatName: nextProps.selectedSeat.name
			});
		}
	}
	acceptModify(){
		console.log('acc', this.state);
		if(this.state.modifyRecord){
			dataHandler.changeSeatData(this.state.seatId, {
				name: this.state.seatName
			});
		}else{
			this.setState({
				seatName: this.props.selectedSeat.name
			})
		}
		this.setState({modifyRecord: false, getProps: true});
		this.confirmWindow();
		this.props.changeShown({modifyUserData: false, modifySeatData: false});
	}
	rejectModify(){
		this.setState({
			seatId: this.props.selectedSeat.id, 
			seatName: this.props.selectedSeat.name,
			modifyRecord: false
		});
		this.confirmWindow();
		this.props.changeShown({modifyUserData: false, modifySeatData: false});
	}
	confirmWindow(){
		this.setState({showConfirm: !this.state.showConfirm});
	}
    modifyData(modify){
        if(!(this.props.selectedUser || this.props.selectedSeat)) return;
		if(modify){
			this.confirmWindow();
			this.setState({
				confirmText: 'Save changes?',
				modifyRecord: true
			});
		}else{
			this.confirmWindow();
			this.setState({
				confirmText: 'Undo changes?'
			});
		}
    }
	handleSeatNameChange(e){
		console.log(e.target.value);
		this.setState({seatName: e.target.value});
	}
    render() {
        var selectedSeat = this.props.selectedSeat;
        var selectedUser = this.props.selectedUser;
		console.log()
        var data;
        // We have only seat selected. In case both seat and user is selected - we're showing user info 
        if(selectedSeat.id){
            data = (
                <table className="table">
                    <tbody>
                    <tr>
                        <td>Seat ID: </td>
                        <td>{selectedSeat.id}</td>
                    </tr>
                    <tr>
                        <td>Seat Name:</td>
                        <td className="form-td">
							<input name="firstname" type="text" placeholder="First Name"value={this.state.seatName} onChange={this.handleSeatNameChange} />
							<span className="glyphicon glyphicon-wrench" aria-hidden="true"></span>
						</td>
                    </tr>
                    <tr>
                        <td>Assigned to:</td>
                        <td>{selectedSeat.assignedTo.id ? (selectedSeat.assignedTo.firstName + ' ' + selectedSeat.assignedTo.surName) : 'No user is assigned'}</td>
                    </tr>
                    <tr>
                        <td>Floor:</td>
                        <td>{selectedSeat.floor}</td>
                    </tr>
                    <tr>
                        <td>Color:</td>
                        <td>{selectedSeat.fillStyle}</td>
                    </tr>
                    <tr>
                        <td>Size:</td>
                        <td>{selectedSeat.radius}</td>
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
                    </tr>
                    <tr>
                        <td>First Name:</td>
                        <td>{selectedUser.firstName}</td>
                    </tr>
                    <tr>
                        <td>Surname:</td>
                        <td>{selectedUser.surName}</td>
                    </tr>
                    <tr>
                        <td>Taken seat name:</td>
                        <td>{selectedUser.seat.name || 'No seat is taken'}</td>
                    </tr>
                    <tr>
                        <td>Taken seat ID:</td>
                        <td>{selectedUser.seat.id || 'No seat is taken'}</td>
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
            <div className="info-box confirm-position">
				<div className={classNames(this.state.showConfirm ? '' : 'hidden')}>
					<ConfirmCheck text={this.state.confirmText} accept={this.acceptModify.bind(this)} reject={this.rejectModify.bind(this)}/>
				</div>
				<div>
                    Modify:
                </div>
                {data}
                <div className="modify-accept col-xs-6 pointer-cursor" onClick={this.modifyData.bind(this, true)}>OK</div>
                <div className="modify-reject col-xs-6 pointer-cursor" onClick={this.modifyData.bind(this, false)}>Cancel</div>
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
export default connect(mapStateToProps, {updateSeatInfo, changeShown})(ModifyForm);

