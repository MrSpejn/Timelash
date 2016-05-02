import React                    from 'react';
import {Route, IndexRoute}      from 'react-router';

import UserActivity             from './components/user-activity';
import Dashboard                from './components/dashboard/dashboard';
import Header                   from './components/header';
import Embrace                  from './components/embrace';
import Signin                   from './components/auth/signin';
import Signout                  from './components/auth/signout';
import CalendarWeekly           from './components/dashboard/calendar-weekly';

import RequireAuth              from './containers/require-auth';

function mainWrapper(p) {
  return (
    <div className='app'>
      <Header />
      {p.children}
    </div>
  );
}

export default (
  <Route path='/' component={mainWrapper}>
    <IndexRoute component={Embrace} />
    <Route path='/signin' component={Signin} />
    <Route path='/signout' component={Signout} />
    <Route path='/activity' component={RequireAuth(UserActivity)} />
    <Route path='/dashboard' component={RequireAuth(Dashboard)} />
    <Route path='/dashboard/weekly' component={RequireAuth(CalendarWeekly)} />
  </Route>
);