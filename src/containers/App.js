import React, { Component}      from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import CurrentActivity          from '../components/current-activity';
import DoneActivitiesList       from '../components/done-activities-list';
import ChooseActivityList       from '../components/choose-activity-list';

class App extends Component {
  componentDidMount() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
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



export default connect(mapStateToProps)(App);
