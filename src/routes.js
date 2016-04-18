import React                  from 'react';
import {Route, IndexRoute}    from 'react-router';

import MainComponent          from './containers/main';
import DashboardComponent     from './containers/dashboard';




export default (
  <Route path='/' component={(p) => {
      return (
        <div className='app'>{p.children}</div>
      )
    }}>
    <IndexRoute component={MainComponent} />
    <Route path='/dashboard' component={DashboardComponent} />
  </Route>
);