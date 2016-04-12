import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import {endProgress}             from '../actions/index';
import {addToHistory}            from '../actions/history';

import Timer                     from '../timer.util';

import CanvasTimeProgress        from '../components/canvas-time-progress';
import ProgressTimer             from '../components/progress-timer';
import ProgressControls          from '../components/progress-controls';


class CurrentActivity extends Component{
  constructor() {
    super();
    this.state = {'time': 0};
  }

  oneSecondPassed() {
    this.setState({'time': this.state.time + 1});
  }

  componentWillMount() {
    this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
    this.setState({'time': this.props.progress.time});

    if (this.state.time !== this.props.progress.checkpoint) {
      this.timer.start();
    }
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.progress != this.props.progress) {
      this.setState({'time': 0});
      this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
      this.timer.start();
    }

    else if (this.state.time === this.props.progress.checkpoint) {
      this.timer.pause();
      this.notify();
      const story = this.props.progress;
      story.time = this.state.time;
      this.props.addToHistory(story);
    }

  }
  endTaskEarlier() {
    const story = this.props.progress;
    story.time = this.state.time;
    this.props.addToHistory(story);
    this.props.endProgress();
  }

  notify() {
    const options = {
      icon: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/clock-icon.png',
    };
    new Notification("Your activity has ended", options);
  }

  render() {
    const progress = this.props.progress;
    const hasProgressEnded = this.state.time === progress.checkpoint;

    return (
         <div className='current-activity'>
             <div className='current-activity__activity-name'>
               {progress.name}
             </div>
             <ProgressTimer currentValue={this.state.time}
                            maxValue={progress.checkpoint} />
             <CanvasTimeProgress currentValue={this.state.time}
                                 maxValue={progress.checkpoint} />
             <ProgressControls timer={this.timer}
                               onStop={endTaskEarlier}
                               status={hasProgressEnded} />
        </div>
    );
  }
}

//  setupOnuloadDataExtraction() {
//     window.onbeforeunload = () => {
//       if (this.props.progress && this.props.progress.name) {
//         localStorage.setItem('currentActivity', JSON.stringify(this.props.progress));
//       }
//     }
//  }

function mapStateToProps(state) {
  return {
    progress: state.progress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({endProgress, addToHistory}, dispatch);
}


      //

export default connect(mapStateToProps, mapDispatchToProps)(CurrentActivity);