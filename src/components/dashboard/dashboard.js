import React, {Component} from 'react';
import PieChart from 'components/charts/pie-chart';
import LineChart from 'components/charts/line-chart';


export default class DashboardComponent extends Component {
  render() {
    return  (
      <div className='dashboard'>
        <h2 className="dashboard__section-title">Statistics</h2>
        <div className="row dashboard__section dashboard__statistics-section">
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

        <h2 className="dashboard__section-title">Share of activity in total time</h2>
        <div className="row dashboard__section">
          <div className='col-sm-9'>
            <LineChart />
          </div>
          <div className='col-sm-3 categories-selection'>
            <h3 className='dashboard__subsection-title'>Categories</h3>
          </div>
        </div>

        <h2 className="dashboard__section-title">Total time splited into categories</h2>
        <div className="row dashboard__section categories-pie-charts">
          <div className='col-sm-3 chart'>
            <h3 className='dashboard__subsection-title'>Year</h3>
            <PieChart name="yearly"/>
          </div>
          <div className='col-sm-3 chart'>
            <h3 className='dashboard__subsection-title'>Month</h3>
            <PieChart name="monthly"/>
          </div>
          <div className='col-sm-3 chart'>
            <h3 className='dashboard__subsection-title'>Week</h3>
            <PieChart name="weekly"/>
          </div>
          <div className='col-sm-3 chart'>
            <h3 className='dashboard__subsection-title'>Day</h3>
            <PieChart name="dayly"/>
          </div>
        </div>


      </div>

    );
  }
}