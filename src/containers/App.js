import React, { Component}        from 'react';
import { bindActionCreators }     from 'redux';
import { connect }                from 'react-redux';

import CurrentActivity            from '../containers/current-activity';
import ChooseActivityList         from '../containers/choose-activity-list';

import DoneActivitiesList         from '../components/done-activities-list';

import {fetchUnfinishedProgress}  from '../actions/index';
import {fetchHistory}             from '../actions/history';


class App extends Component {
  componentWillMount() {
    console.debug('APP: Will mount', this.props);
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    this.props.fetchUnfinishedProgress();
  }
  componentDidMount() {
    console.debug('APP: Did mount', this.props);
    //this.props.fetchHistory();
  }

  componentWillReceiveProps(props) {
    console.debug('APP: Will receive props', props);
  }

  render() {
    console.debug('APP: Render', this.props);

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
          <DoneActivitiesList activities={this.props.history}/>
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
