import React, { Component}        from 'react';
import { connect }                from 'react-redux';

import ProgressBox                from '../containers/progress-box';
import ChooseActivityList         from '../containers/choose-activity-list';

import HistoryList                from '../components/history/history-list';

import {fetchUnfinishedProgress}  from '../actions/progress';
import {fetchHistory}             from '../actions/history';


class Main extends Component {
  componentWillMount() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    this.props.fetchUnfinishedProgress();
  }
  componentDidMount() {
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
      <div className='app'>
        <ChooseActivityList />
        <div className="done-activties-wrapper">
          <HistoryList history={this.props.history}/>
        </div>
        <div className="current-activity-wrapper">
          {progressBox}
        </div>
      </div>
    );
  }
}




function mapStateToProps(state) {
  return {
    history: state.history,
    progress: state.progress
  };
}



export default connect(mapStateToProps, {fetchHistory, fetchUnfinishedProgress})(Main);
