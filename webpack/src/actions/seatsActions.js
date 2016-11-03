import * as types from './actionTypes';


export function addNewSeat(seat) {
    return {type: types.NEW_SEAT, seat};
}

export function selectSeat(seat){	
	return {type: types.SELECT_SEAT, seat};
}
export function deleteSeat(id){
	return {type: types.DELETE_SEAT, id};
}
export function updateSeatLocation(id, x, y){
	return {type: types.UPDATE_SEAT_LOCATION, id, x, y};
}
export function updateSeatInfo(seat){
	return {type: types.UPDATE_SEAT_INFO, seat};
}
export function updateSeatUser(seat){
	return {type: types.UPDATE_SEAT_INFO, seat};
}