import React from 'react';

export default () => {
  return (
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
  );
}