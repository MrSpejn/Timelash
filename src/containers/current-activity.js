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
    window.onbeforeunload = () => {
      const progress = this.props.progress;

      if (progress && progress.name) {
        progress.time = this.state.time;
        localStorage.setItem('currentActivity', JSON.stringify(progress));
      }
    }
  }

  oneSecondPassed() {
    this.setState({'time': this.state.time + 1});
  }

  componentWillMount() {
    this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
    this.setState({'time': this.props.progress.time});

    if (this.props.progress.time !== this.props.progress.checkpoint) {
      this.timer.start();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.progress !== this.props.progress) {
      this.progressHasChanged();
    }
    else if (this.state.time === this.props.progress.checkpoint) {
      this.progressReachedCheckpoint();
    }
  }

  progressReachedCheckpoint() {
    this.timer.pause();
    this.notify();
    const story = this.props.progress;
    story.time = this.state.time;
    this.props.addToHistory(story);
  }

  progressHasChanged() {
    this.setState({'time': 0});
    this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
    this.timer.start();
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
                               onStop={() => this.endTaskEarlier()}
                               status={hasProgressEnded} />
        </div>
    );
  }
  endTaskEarlier() {
    const story = this.props.progress;
    story.time = this.state.time;
    this.props.addToHistory(story);
    this.props.endProgress();
  }
}


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