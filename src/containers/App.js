import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {startActivity} from '../actions/index';
import CurrentActivity from '../components/current-activity';

const activities = [
  {
    'name': 'Sport',
    'time': 0,
    'checkpoint': 10
  },
  {
    'name': 'House',
    'time': 0,
    'checkpoint': 120
  },
  {
    'name': 'Work',
    'time': 0,
    'checkpoint': 60
  },
  {
    'name': 'Learning',
    'time': 0,
    'checkpoint': 30
  },
  {
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
    if (!this.props.activity) {
      this.props.startActivity(activity);
    }
  }
  render() {
    const activitiesNodes = activities.map((act, i) => {
      return (
        <li onClick={() => { this.startActivityIfPossible(activities[i]) }}>
          {act.name}
        </li>
      );
    });

    return  (
      <div className='app'>
        <ul className='choose-activity-list'>
          {activitiesNodes}
        </ul>
        {this.props.activity ? <CurrentActivity /> : ''}

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
