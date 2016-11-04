import * as types from './actionTypes';

export function selectUser(user){
    return {type: types.SELECT_USER, user};
}

export function newUser(user){
    return {type: types.NEW_USER, user};
}
export function updateUserLocation(user){
    return {type: types.UPDATE_USER_SEAT, user};
}

export function initUsers(users){
    return {type: types.INITIALIZE_USERS, users}
}