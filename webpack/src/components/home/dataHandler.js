'use strict';
import store from '../../store/configureStore';
import defaultValues from './initValues'

import {selectSeat, updateSeatInfo} from '../../actions/seatsActions';
import {updateUserLocation} from '../../actions/usersActions';

var api = {};

api.assignUserSeat = function(seat_id, user_id){
    // getting seat and user info
    var {users, seats} = getUsersSeatsArr(store.getState());
    var seat = seats.filter((v)=>v.id == seat_id)[0],
        user = users.filter((v)=>v.id == user_id)[0],
        oldSeat, oldUser, newSeat, newUser;

    // checking in case user or seat were already assigned/taken
    if(user.seat.id){
        oldSeat = copyObj(seats.filter((v)=>v.id == user.seat.id)[0]);
        oldSeat.assignedTo = Object.assign({}, defaultValues.newSeatForm.assignedTo);
        store.dispatch(updateSeatInfo(oldSeat));
    }
	// swapping seats
	if(seat.assignedTo.id){
        oldUser = copyObj(users.filter((v)=>v.id == seat.assignedTo.id)[0]);
        oldUser.seat = Object.assign({}, defaultValues.newUserForm.seat);
        store.dispatch(updateUserLocation(oldUser));
    }
	
    // updating values
    newSeat = copyObj(seat);
    newSeat.assignedTo = {
        id: user.id,
        firstName: user.firstName,
        surName: user.surName
    };
    newUser = copyObj(user);
    newUser.seat = {
        id: seat.id,
        name: seat.name
    };
    store.dispatch(updateSeatInfo(newSeat));
    store.dispatch(updateUserLocation(newUser));
};


api.changeSeatData = function(seat_id, newSeatData){
	var {users, seats} = getUsersSeatsArr(store.getState());
	var seat = seats.filter((v)=>v.id == seat_id)[0], user, newSeat, newUser;
	newSeat = copyObj(seat);
	Object.keys(newSeatData).forEach((v)=>{
		newSeat[v] = newSeatData[v];
	});
    store.dispatch(updateSeatInfo(newSeat));
	if(seat.assignedTo.id && seat.name != newSeatData.name){
		user = users.filter((v)=>v.id == seat.assignedTo.id)[0];
		console.log('123', seat, users);
		newUser = copyObj(user);
		newUser.seat.name = newSeat.name;
		store.dispatch(updateUserLocation(newUser));
	}
	store.dispatch(selectSeat(newSeat));
}


export default api;

function getUsersSeatsArr(state){
    return {users: state.arrUsersReducer, seats: state.arrSeatsReducer};
}

export function copyObj(el){
    var seat = {};
	console.log('el', el);
    Object.keys(el).forEach((v)=>{
        seat[v] = (typeof(el[v]) == 'object' && !!el[v]) ? Object.assign({}, el[v]) : el[v];
    });
    return seat;
}