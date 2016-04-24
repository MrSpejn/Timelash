import React                    from 'react';
import {Route, IndexRoute}      from 'react-router';

import MainComponent            from './containers/main';
import DashboardComponent       from './containers/dashboard';
import HeaderComponent          from './components/header';
import EmbraceComponent         from './components/embrace';
import SigninComponent          from './components/auth/signin';
import CalendarWeeklyComponent  from './components/dashboard/calendar-weekly';


function mainWrapper(p) {
  console.log(p.children);
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
    <Route path='/main' component={MainComponent} />
    <Route path='/dashboard' component={DashboardComponent}>
      <Route path='/dashboard/weekly' component={CalendarWeeklyComponent} />
    </Route>
  </Route>
);