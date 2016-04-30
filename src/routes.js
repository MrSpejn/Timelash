import React                    from 'react';
import {Route, IndexRoute}      from 'react-router';

import MainComponent            from './components/main';
import DashboardComponent       from './components/dashboard/dashboard';
import HeaderComponent          from './components/header';
import EmbraceComponent         from './components/embrace';
import SigninComponent          from './components/auth/signin';
import SignoutComponent         from './components/auth/signout';
import CalendarWeeklyComponent  from './components/dashboard/calendar-weekly';


function mainWrapper(p) {
  return (
    <div className='app'>
      <HeaderComponent />
      {p.children}
    </div>
  );
}

export default (
  <Route path='/' component={mainWrapper}>
    <IndexRoute component={EmbraceComponent} />
    <Route path='/signin' component={SigninComponent} />
    <Route path='/signout' component={SignoutComponent} />
    <Route path='/current' component={MainComponent} />
    <Route path='/dashboard' component={DashboardComponent}>
      <Route path='/dashboard/weekly' component={CalendarWeeklyComponent} />
    </Route>
  </Route>
);