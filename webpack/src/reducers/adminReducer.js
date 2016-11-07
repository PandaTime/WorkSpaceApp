import * as types from '../actions/actionTypes';
import initialState from './initialState';

export function dataSourceReducer(state = initialState.dataChangeSource, action){
    switch (action.type) {
        case types.DATA_CHANGE_SOURCE:
            return action.source;
        default:
            return state;
    }
}
export function authericationReducer(state = initialState.loggedUser, action){
    switch (action.type){
        case types.AUTHENTICATION:
            return action.loggedUser;
        default:
            return state
    }
}