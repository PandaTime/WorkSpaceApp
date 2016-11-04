import * as types from '../actions/actionTypes';
import initialState from './initialState';
import defaultValues from '../components/home/initValues'

export function arrUsersReducer(state = initialState.users, action){
    switch (action.type) {
        case types.NEW_USER:
            var newUser = action.user;
            newUser.seat = Object.assign({}, defaultValues.newUserForm.seat);
            newUser.id = defaultValues.newUserForm.id();
            return [...state.map((v)=>Object.assign({}, v)), newUser];

        case types.UPDATE_USER_SEAT:
            var i = getIndex(state, action.user);
            if(i < 0)
                return state;
            return [...state.slice(0, i), action.user, ...state.slice(i+1)];
        
        default:
            return state;
    }
}
export function selectUserReducer(state = initialState.selectedUser, action){
    switch (action.type) {
        case types.SELECT_USER:
            return action.user;
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