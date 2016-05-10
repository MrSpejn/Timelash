import React, {Component} from 'react';

import PieChart                from 'components/charts/pie-chart';
import ActivityTimeComparition from './activity-time-comparition';
import StatisticShowcase       from './statistic-showcase';
import MonthActivityDensity    from './month-activity-density';
import CalendarWeekly          from './calendar-weekly';

export default class DashboardComponent extends Component {

  render() {
    return  (
      <div className='dashboard'>
        <StatisticShowcase />

        <div className="l-flex">
          <div className='col-lg-8 l-flex dashboard__section'>
            <h2 className="dashboard__section-title">Share of activity in total time</h2>
            <ActivityTimeComparition />
            <div className="categories-selection">
              <h3 className='dashboard__subsection-title'>Categories</h3>
            </div>
          </div>

          <div className='col-lg-4 l-pushbit dashboard__section'>
            <h2 className="dashboard__section-title">Month activity density</h2>
            <MonthActivityDensity />
          </div>
        </div>

        <div className="l-flex categories-pie-charts">
          <div className='col-md-7 dashboard__section'>
            <h2 className="dashboard__section-title">Weekly Timetable</h2>
            <CalendarWeekly />
          </div>

          <div className='col-md-5 l-flex-wrap l-pushbit dashboard__section'>
            <h2 className="dashboard__section-title">Total time splited into categories</h2>
            <div className='col-sm-6 chart'>
              <h3 className='dashboard__subsection-title'>Year</h3>
              <PieChart name="yearly"/>
            </div>
            <div className='col-sm-6 chart'>
              <h3 className='dashboard__subsection-title'>Month</h3>
              <PieChart name="monthly"/>
            </div>
            <div className='col-sm-6 chart'>
              <h3 className='dashboard__subsection-title'>Week</h3>
              <PieChart name="weekly"/>
            </div>
            <div className='col-sm-6 chart'>
              <h3 className='dashboard__subsection-title'>Day</h3>
              <PieChart name="dayly"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}