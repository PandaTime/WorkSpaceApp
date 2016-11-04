import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import routes from './routes';
import './styles/styles.scss';
import './styles/canvas.scss';
import './styles/search-info.scss';
import './styles/navbar.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './components/ws/websocket';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);

