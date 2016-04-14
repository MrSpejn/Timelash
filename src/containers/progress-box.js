import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import {endProgress}             from '../actions/progress';
import {addToHistory}            from '../actions/history';

import Timer                     from '../timer.util';

import ProgressTimeCanvas        from '../components/progress-time-canvas';
import ProgressTimer             from '../components/progress-timer';
import ProgressControls          from '../components/progress-controls';


class ProgressBox extends Component{
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

    if (this.props.progress.time !== this.props.progress.checkpoint) {
      this.timer.start();
      this.extractDataOnUnload();
    }
    else {
      this.props.addToHistory(this.props.progress);
    }
  }

  extractDataOnUnload() {
    window.onbeforeunload = () => {
      const progress = this.props.progress;

      if (progress && progress.name && this.state.time !== progress.checkpoint) {
        progress.time = this.state.time;
        localStorage.setItem('progress', JSON.stringify(progress));
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.progress !== this.props.progress) {
      this.progressHasChanged();
    }
    else if (nextState.time === this.props.progress.checkpoint) {
      this.progressReachedCheckpoint();
    }
  }

  progressReachedCheckpoint() {
    this.timer.pause();
    this.notify();
    const story = this.props.progress;
    story.time = this.state.time + 1;
    this.props.addToHistory(story);
  }

  progressHasChanged() {
    this.setState({'time': 0});
    this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
    this.timer.start();
  }

  notify() {
    const options = {
      icon: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/clock-icon.png'
    };
    new Notification('Your activity has ended', options);
  }

  render() {
    const progress = this.props.progress;
    const hasProgressEnded = this.state.time === progress.checkpoint;

    return (
         <div className='progress-box'>
             <div className='progress-box__activity-name'>
               {progress.name}
             </div>
             <ProgressTimer currentValue={this.state.time}
                            maxValue={progress.checkpoint} />
             <ProgressTimeCanvas currentValue={this.state.time}
                                 maxValue={progress.checkpoint} />
             <ProgressControls timer={this.timer}
                               onStop={() => this.endTaskEarlier()}
                               hasProgressEnded={hasProgressEnded} />
        </div>
    );
  }

  endTaskEarlier() {
    window.onbeforeunload = () => {};

    const story = this.props.progress;
    story.time = this.state.time;
    this.props.addToHistory({ ...story});
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

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBox);