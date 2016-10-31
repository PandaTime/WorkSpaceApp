import * as types from '../actions/actionTypes';
import initialState from './initialState';
import defaultValues from '../components/home/initValues'

export function changeShownReducer(state = initialState.shownBlocks, action){
    switch (action.type) {
        case types.CHANGE_SHOW_BLOCKS:
			var	keys = Object.keys(action.blocks),
				res = Object.assign({}, state);
			keys.forEach((v)=>{
				res[v] = action.blocks[v];
			})
            return res;
		default:
            return state;
    }
}
