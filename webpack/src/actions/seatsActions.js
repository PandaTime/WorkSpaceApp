import * as types from './actionTypes';


export function addNewSeat(seat) {
    return {type: types.NEW_SEAT, seat};
}

export function selectSeat(seat){
	return {type: types.SELECT_SEAT, seat};
}

export function updateSeatLocation(id, x, y){
	return {type: types.UPDATE_SEAT_LOCATION, id, x, y};
}
export function updateSeatInfo(){
	return {type: types.UPDATE_SEAT_LOCATION, id, x, y};
}