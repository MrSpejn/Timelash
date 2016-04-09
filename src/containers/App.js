import React, { Component}      from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import moment                   from 'moment';

import CurrentActivity          from '../components/current-activity';
import DoneActivitiesList       from '../components/done-activities-list';
import ChooseActivityList       from '../components/choose-activity-list';
import {startProgress,
        addActivity}            from '../actions/index';

class App extends Component {
  componentDidMount() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    const taskInStorage = JSON.parse(localStorage.getItem('currentActivity'));

    if (taskInStorage) {
      taskInStorage.date = moment(taskInStorage.date);
      const sec = (moment().valueOf() - taskInStorage.date.valueOf()) / 1000;

      if (sec > taskInStorage.checkpoint) {
        taskInStorage.time = taskInStorage.checkpoint;
        this.props.startProgress(taskInStorage);
        this.props.addActivity(taskInStorage);
      }
      else {
        taskInStorage.time = Math.round(sec);
        this.props.startProgress(taskInStorage);
      }
    }
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
          <DoneActivitiesList activities={this.props.activities}/>
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
    activities: state.activities,
    progress: state.progress
  };
}



export default connect(mapStateToProps, {startProgress, addActivity})(App);
