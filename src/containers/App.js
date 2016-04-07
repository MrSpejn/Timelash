import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {startActivity} from '../actions/index';
import CurrentActivity from '../components/current-activity';

class App extends Component {
  componentWillMount() {
    const startingActivity = {
      'name': 'Running',
      'time': 0,
      'checkpoint': 10
    };
    this.props.startActivity(startingActivity);
  }
  render() {
    return  (
      <div className='app'>
        <ul className='choose-activity-list'>
          <li>House</li>
          <li>Learning</li>
          <li>Meeting</li>
          <li>Work</li>
          <li>Sport</li>
        </ul>
        {this.props.activity ? <CurrentActivity /> : ''}z

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
