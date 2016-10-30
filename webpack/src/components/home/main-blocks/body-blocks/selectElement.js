import React from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';
import {selectUser, updateUserLocation} from '../../../../actions/usersActions';
import {addNewSeat, updateSeatUser, deleteSeat} from '../../../../actions/seatsActions';


class SelectElement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            optShow : false,
            showUsedSeats : false,
            temp_seat_id: 'TEMP_SEAT'
        };
        this.toggleSeatOptions= this.toggleSeatOptions.bind(this);
    }
    toggleSeatOptions(){
        this.setState({optShow:!this.state.optShow})
    }
    showUsedSeatsFn(show){
        this.setState({showUsedSeats : show, optShow : false});
    }
    assignSeat(id){
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
            if(showUsed)
                return (<div key={i}>{v.id}</div>);
            else if(!v.assignedTo.id)
                return (<div key={i}
                             onMouseEnter={this.hoverSeat.bind(this, v.x, v.y, v.id)}
                             onMouseOut={this.unhoverSeat.bind(this, v.id)}
                             onClick={this.assignSeat.bind(this, v.id)}>{v.id}</div>);
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
                        <div>
                            {seats[0] ? seats : 'No seats are available'}
                        </div>
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

