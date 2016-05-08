import React, {Component} from 'react';
import PieChart from 'components/charts/pie-chart';
import LineChart from 'components/charts/line-chart';
import MonthActivityDensity from './month-activity-density';
import CalendarWeekly       from './calendar-weekly';
import moment from 'moment';

export default class DashboardComponent extends Component {
  render() {
    return  (
      <div className='dashboard'>
        <div className="row dashboard__statistics-section">
            <div className='col-sm-2'>
              <h3>Logged Time</h3>
              <p className='dashboard__statistic'>128h</p>
            </div>
            <div className='col-sm-2'>
              <h3>Weekly Track Percentage</h3>
              <p className='dashboard__statistic'>28%</p>
            </div>
            <div className='col-sm-2'>
              <h3>Most frequent category</h3>
              <p className='dashboard__statistic'>Work</p>
            </div>
            <div className='col-sm-2'>
              <h3>Most frequent activity</h3>
              <p className='dashboard__statistic'>Project ITC</p>
            </div>
            <div className='col-sm-2'>
              <h3>Most frequent activity time</h3>
              <p className='dashboard__statistic'>42h</p>
            </div>
            <div className='col-sm-2'>
              <h3>Untracked Hours</h3>
              <p className='dashboard__statistic'>65h</p>
            </div>
        </div>

        <div className="l-flex">
          <div className='col-lg-8 l-flex dashboard__section'>
            <h2 className="dashboard__section-title">Share of activity in total time</h2>
            <LineChart beginDate={moment('25 Apr', 'DD MMM')}
                       endDate={moment('8 May', 'DD MMM')}
                       id="categories-line-chart" height="250"/>
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