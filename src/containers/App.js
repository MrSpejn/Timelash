import React, { Component}        from 'react';
import { connect }                from 'react-redux';

import CurrentActivity            from '../containers/current-activity';
import ChooseActivityList         from '../containers/choose-activity-list';

import HistoryList                from '../components/history-list';

import {fetchUnfinishedProgress}  from '../actions/index';
import {fetchHistory}             from '../actions/history';


class App extends Component {
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
    let currentActivity;

    if (this.props.progress) {
      currentActivity = <CurrentActivity />;
    }
    else {
      currentActivity = <h3 className="choose-activity">Choose activity</h3>;
    }

    return  (
      <div className='app'>
        <ChooseActivityList />
        <div className="done-activties-wrapper">
          <HistoryList history={this.props.history}/>
        </div>
        <div className="current-activity-wrapper">
          {currentActivity}
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



export default connect(mapStateToProps, {fetchHistory, fetchUnfinishedProgress})(App);
