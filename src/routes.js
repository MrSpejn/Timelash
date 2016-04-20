import React                    from 'react';
import {Route, IndexRoute}      from 'react-router';

import MainComponent            from './containers/main';
import DashboardComponent       from './containers/dashboard';
import HeaderComponent          from './components/header';
import CalendarWeeklyComponent  from './components/dashboard/calendar-weekly';


export default (
  <Route path='/' component={(p) => {
      return (
        <div>
          <HeaderComponent />
          <div className='app'>
            {p.children}
          </div>
        </div>
      );
    }}>
    <IndexRoute component={MainComponent} />
    <Route path='/dashboard' component={DashboardComponent}>
      <Route path='/dashboard/weekly' component={CalendarWeeklyComponent} />
    </Route>
  </Route>
);