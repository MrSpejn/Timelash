import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {startProgress} from '../actions/index';
import CurrentActivity from '../components/current-activity';
import DoneActivitiesList from '../components/done-activities-list';
const activities = [
  {
    'id': '_f1',
    'name': 'Sport',
    'time': 0,
    'checkpoint': 10
  },
  {
    'id': '_f2',
    'name': 'House',
    'time': 0,
    'checkpoint': 120
  },
  {
    'id': '_f3',
    'name': 'Work',
    'time': 0,
    'checkpoint': 60
  },
  {
    'id': '_f4',
    'name': 'Learning',
    'time': 0,
    'checkpoint': 30
  },
  {
    'id': '_f5',
    'name': 'Meeting',
    'time': 0,
    'checkpoint': 15
  }

];

class App extends Component {
  startProgressIfPossible(progress) {
    const current = this.props.progress;
    if (!current || current.time === current.checkpoint) {
      this.props.startProgress(progress);
    }
  }

  renderCurrentActivity() {
    if (this.props.progress) {
      return <CurrentActivity />;
    }
    else {
      return <h3 className="choose-activity">Choose activity</h3>;
    }
  }

  render() {
    const activitiesNodes = activities.map((act, i) => {
      return (
        <li key={act.id} onClick={() => { this.startProgressIfPossible(activities[i]) }}>
          {act.name}
        </li>
      );
    });

    return  (
      <div className='app'>
        <ul className='choose-activity-list'>
          {activitiesNodes}
        </ul>
        <div className="done-activties-wrapper">
          <DoneActivitiesList activities={this.props.activities}/>
        </div>
        <div className="current-activity-wrapper">
          {this.renderCurrentActivity()}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startProgress}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
