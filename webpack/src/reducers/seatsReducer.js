import * as types from '../actions/actionTypes';
import initialState from './initialState';
import Seat from '../components/canvasManipulation/shapes';

export function arrSeatsReducer(state = initialState.seats, action) {
    switch (action.type) {
        case types.NEW_SEAT:
            return [...state, new Seat(action.seat)];
		case types.UPDATE_SEAT_INFO:
			return state;
		case types.UPDATE_SEAT_LOCATION:
			var i = getIndex(state, action);
			if(i < 0)
				return state;
			var el = state[i];
			var newSeatOpt = {
				id: el.id,
				x : action.x,
				y : action.y,
				radius: el.radius,
				floor: el.floor,
				assignedTo: el.assignedTo
			};
            return [...state.slice(0, i), new Seat(newSeatOpt), ...state.slice(i+1)];
        default:
            return state;
    }
};

export function selectSeatReducer(state = initialState.selected, action){
	switch (action.type) {
		case types.SELECT_SEAT:
			return action.seat;
		default:
			return state;
	}
}

export function updateSeatInfoReducer(state = initialState.seats, action){
	switch (action.type) {
		case types.UPDATE_SEAT_INFO:
			return state;
		default:
			return state;
	}
}

function getIndex(state, action){
	var i = -1;
	state.some((el, index)=>{
		if(el.id == action.id){
			i = index;
			return true;}
	});
	return i;
}