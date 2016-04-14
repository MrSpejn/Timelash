require('./styles/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/root';
import Main from './containers/main';

const createStoreWithMiddlewares = applyMiddleware()(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
