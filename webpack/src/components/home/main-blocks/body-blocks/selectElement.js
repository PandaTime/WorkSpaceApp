import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {selectUser, updateUserLocation} from '../../../../actions/usersActions';
import {addNewSeat, updateSeatUser, deleteSeat} from '../../../../actions/seatsActions';

import ConfirmCheck from './confirmCheck';
import dataHandler from '../../dataHandler';

class SelectElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optShow : false,
            showUsedSeats : false,
            temp_seat_id: 'TEMP_SEAT',
            confirmSeatAssign: false,
            seatID: '',
            seatName: '',
            confirmText: ''
        };
        this.toggleSeatOptions= this.toggleSeatOptions.bind(this);
    }
    toggleSeatOptions(){
        this.setState({optShow:!this.state.optShow})
    }
    showUsedSeatsFn(show){
        this.setState({showUsedSeats : show, optShow : false});
    }
    confirmAssignment(id, name){
        this.setState({
            confirmSeatAssign: true,
            seatID: id,
            seatName: name,
            confirmText: 'Assign seat ' + name + ' to user ' + this.props.selectedUser.firstName + ' ' + this.props.selectedUser.surName + '?'
        });
    }
    rejectSeatAssignment(){
        this.setState({
            confirmSeatAssign: false,
            seatID: '',
            seatName: '',
            confirmText: ''
        })
    }
    assignSeat(){
        dataHandler.assignUserSeat(this.state.seatID, this.props.selectedUser.id);
        // changing selected user
        this.props.selectUser(this.props.users.filter((v)=>v.id == this.props.selectedUser.id)[0]);
        // deleting temp seat
        this.unhoverSeat(this.state.seatID);
        // hiding unneeded tabs
        this.toggleSeatOptions();
        this.props.toggleSeatFormShow();
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
        var showUsed = this.state.showUsedSeats,
            temp_seat_id = this.state.temp_seat_id;
        var seats = this.props.seats.map((v, i)=>{
            if(v.id.startsWith(temp_seat_id)) return;
            //if(showUsed)
            //    return (<div key={i}>{v.id}</div>);
            if(showUsed || !v.assignedTo.id)
                return (<li key={i} className="list-group-item"
                             onMouseEnter={this.hoverSeat.bind(this, v.x, v.y, v.id)}
                             onMouseOut={this.unhoverSeat.bind(this, v.id)}
                             onClick={this.confirmAssignment.bind(this, v.id, v.name)}>
                            <div className="select-user-name">{v.name}</div>
                            <div className="select-user-seat">{v.assignedTo.id ? v.assignedTo.name : 'Seat isn\'t occupied'}</div>
                        </li>);
        });

        return (
            <div>
                <div className="info-select-user">
                    <div className="search-element-exit pointer-cursor" onClick={this.props.toggleSeatFormShow}>X</div>
                    <div></div>
                    <div className="form-box">
                        <div>
                            <div className="input-group ">
                                <input type="text" className="form-control" aria-label="..."/>

                                <div className="input-group-btn">
                                    <button type="button" className="btn btn-default search-element-input" onClick={this.toggleSeatOptions}>{this.state.showUsedSeats ? 'w/' : 'w/o'}<span className="caret"></span></button>
                                </div>
                                <ul className={classNames('dropdown-menu info-box-search react-toggle', this.state.optShow ? '' : 'hidden')}>
                                    <li><a onClick={this.showUsedSeatsFn.bind(this, true)}>w/  used Seats</a></li>
                                    <li><a onClick={this.showUsedSeatsFn.bind(this, false)}>w/o used Seats</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className={classNames(this.state.confirmSeatAssign ? '' : 'hidden')}>
                            <ConfirmCheck text={this.state.confirmText} accept={this.assignSeat.bind(this)} reject={this.rejectSeatAssignment.bind(this)}/>
                        </div>
                        <ul className="list-group">
                            {seats[0] ? seats : 'No seats are available'}
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
export default connect(mapStateToProps, {addNewSeat, updateSeatUser, deleteSeat, selectUser, updateUserLocation})(SelectElement);

