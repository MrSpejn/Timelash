require('./styles/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers/root';
import App from './containers/App';

const createStoreWithMiddlewares = applyMiddleware()(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <App />
  </Provider>,
  document.getElementById('app')
);
