import React, { Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CurrentActivity from '../components/current-activity';

const currentActivity = {
  'name': 'Running',
  'time': 0,
  'checkpoint': 120
};

class App extends Component {
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
        <CurrentActivity activity={currentActivity} />
      </div>
    );
  }
}



export default connect(null, null)(App);
