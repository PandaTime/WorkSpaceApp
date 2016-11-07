import * as types from './actionTypes';


export function dataChangeSource(source) {
    return {type: types.DATA_CHANGE_SOURCE, source};
}
export function loggedUser(loggedUser){
    return {type: types.AUTHENTICATION, loggedUser};
}
