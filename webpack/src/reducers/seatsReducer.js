import * as types from '../actions/actionTypes';
import initialState from './initialState';
import Seat from '../components/common/shapes';

export function arrSeatsReducer(state = initialState.seats, action) {
    switch (action.type) {
        case types.NEW_SEAT:
            return [...state, new Seat(action.seat)];
		case types.UPDATE_SEAT_LOCATION:
			var i = -1;
			state.some((el, index)=>{
				if(el.id == action.id){
					i = index;
					return true;
				}
			});
			if(i < 0)
				return state;
			var seat = state[i];
			console.log(seat.x, action.x);
			seat.x = action.x;
			seat.y = action.y;
			console.log(seat.x);
            return [...state.slice(0, i), seat, ...state.slice(i+1)];
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