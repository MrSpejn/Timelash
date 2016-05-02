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
    let progressBox;

    if (this.props.progress) {
      progressBox = <ProgressBox />;
    }
    else {
      progressBox = <h3 className="choose-activity">Choose activity</h3>;
    }

    return  (

      <div className="activity-supervisor">
        <div className="current-activity-wrapper">
          {progressBox}
        </div>
        <ActivitiesList />
        <div className="done-activties-wrapper">
          <HistoryList history={this.props.history}/>
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
