require('./styles/app.scss');

import React                              from 'react';
import ReactDOM                           from 'react-dom';
import { Provider }                       from 'react-redux';
import { createStore, applyMiddleware }   from 'redux';
import {Router, browserHistory}           from 'react-router';

import reducers                           from './reducers/root';
import routes                             from './routes';

const createStoreWithMiddlewares = applyMiddleware()(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('bootstrap')
);
