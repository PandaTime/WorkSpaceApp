import * as types from './actionTypes';

export function changeShown(blocks){
    return {type: types.CHANGE_SHOW_BLOCKS, blocks};
}