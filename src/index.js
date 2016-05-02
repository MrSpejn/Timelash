require('./styles/app.scss');

import React                              from 'react';
import ReactDOM                           from 'react-dom';
import { Provider }                       from 'react-redux';
import { createStore, applyMiddleware }   from 'redux';
import {Router, browserHistory}           from 'react-router';
import thunk                              from 'redux-thunk';

import reducers                           from './reducers/root';
import routes                             from './routes';
import {SIGN_IN}                          from './actions/types';


const createStoreWithMiddlewares = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddlewares(reducers);
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({type: SIGN_IN});
}

if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('bootstrap')
);
