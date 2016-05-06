import React, { Component}        from 'react';
import { connect }                from 'react-redux';

import ProgressBox                from './progress/progress-box';
import ActivitiesList             from './activities/activities-list';
import HistoryList                from './history/history-list';
import {fetchUnfinishedProgress}  from 'actions/progress';
import {fetchHistory}             from 'actions/history';
import {fetchProfile}             from 'actions/profile';


class UserActivity extends Component {
  componentWillMount() {
    this.props.fetchUnfinishedProgress();
    this.props.fetchProfile();
    this.props.fetchHistory();
  }

  render() {
    const encourageChoosing = (
      <h3 className="choose-activity">Choose activity</h3>
    );


    return  (

      <div className="activity-supervisor">
        <div className="flex-row">
          <div className="category-list-module">
            <h2 className="section-title">Activity categories</h2>
            <ActivitiesList />
          </div>
          <div className="progress-module">
            <h2 className="section-title">Activity progress</h2>
            {this.props.progress ? <ProgressBox /> : encourageChoosing}
          </div>

          <div className="col-md-3 recent-history-module">
            <h2 className="section-title">Recently ended activities</h2>
            <HistoryList history={this.props.history}/>
          </div>


        </div>
      </div>
    );
  }
}




function mapStateToProps(state) {
  return {
    history: state.history,
    progress: state.progress,
  };
}



export default connect(mapStateToProps, {
  fetchUnfinishedProgress,
  fetchHistory,
  fetchProfile
})(UserActivity);
