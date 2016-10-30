import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {updateSeatInfo} from '../../../actions/seatsActions';

import SelectElement from './body-blocks/selectElement'

class Information extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showSelectElementFrom: false
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
        console.log(this.props.seats);
        return (
            <div className="info-box col-md-3">
                <div className={classNames(selectedUser.firstName ? '' : 'hidden')}>
                    <div className="col-md-6">Full Name: {selectedUser.firstName} {selectedUser.surName}</div>
                    <div className="row"></div>
                    <div>
                        <div className="col-md-6">Sitting at: {selectedUser.seat ? selectedUser.seat.id : 'Don\'t have seat'}</div>
                        <div className="col-xs-1 col-xs-offset-2" on>
                            <span className="glyphicon glyphicon-map-marker pointer-cursor" aria-hidden="true" onClick={this.assignSeat.bind(this, true)}></span>
                        </div>
                        <div className="col-xs-1">
                            <span className="glyphicon glyphicon-remove pointer-cursor" aria-hidden="true" onClick={this.assignSeat.bind(this, false)}></span>
                        </div>
                    </div>
                </div>
                <div className={classNames(this.state.showSelectElementFrom ? '' : 'hidden')}>
                    <SelectElement toggleSeatFormShow={this.toggleSeatFormShow}/>
                </div>
                <div className={classNames(!selectedUser.firstName && selectedSeat.id ? '' : 'hidden')}>
                    <div>Seat Name: {selectedSeat.id}</div>
                    <div>Assigned to: {selectedSeat.assignedTo && selectedSeat.assignedTo.id ? (selectedSeat.assignedTo.firstName + ' ' + selectedSeat.assignedTo.surName) : 'Click to assign user'}</div>
                </div>
                <div className={classNames(!selectedUser.firstName && !selectedSeat.id ? '' : 'hidden')}>
                    No user or a a seat is selected.
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
export default connect(mapStateToProps, {updateSeatInfo})(Information);

