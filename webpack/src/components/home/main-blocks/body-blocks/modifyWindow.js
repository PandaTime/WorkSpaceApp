import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {updateSeatInfo} from '../../../../actions/seatsActions';

import {changeShown} from '../../../../actions/showActions';

class ModifyForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSelectElementFrom: false,
            swapToInfo: {searchElement: true, infoElement: false},
            showModifyWindow: false
        };
        this.toggleSeatFormShow = this.toggleSeatFormShow.bind(this);
        this.modifyData = this.modifyData.bind(this);
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
    modifyData(){
        if(!(this.state.props.selectedUser || this.props.selectedSeat)) return;

    }
    render() {
        var selectedSeat = this.props.selectedSeat;
        var selectedUser = this.props.selectedUser;

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
                        <td>{selectedSeat.name}</td>
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
            <div className="info-box">
                <div>
                    Modify: <span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true" onClick={this.modifyData}></span>
                </div>
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
export default connect(mapStateToProps, {updateSeatInfo, changeShown})(ModifyForm);

