import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import * as actionCreators from '../actions/actionTypes';

export default (function store(initialState) {
    const composeEnhancers = composeWithDevTools({ realtime: true, actionCreators });
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    );
})();
