import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {startActivity} from '../actions/index';
import CurrentActivity from '../components/current-activity';

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
  componentWillMount() {

    this.props.startActivity(activities[0]);
  }
  startActivityIfPossible(activity) {
    const current = this.props.activity;
    if (!current || current.time === current.checkpoint) {
      this.props.startActivity(activity);
    }
  }
  render() {
    const activitiesNodes = activities.map((act, i) => {
      return (
        <li key={act.id} onClick={() => { this.startActivityIfPossible(activities[i]) }}>
          {act.name}
        </li>
      );
    });

    return  (
      <div className='app'>
        <ul className='choose-activity-list'>
          {activitiesNodes}
        </ul>
        {this.props.activity ? <CurrentActivity /> : <h3 className="choose-activity">Choose activity</h3>}

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    activity: state.activity
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startActivity}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
