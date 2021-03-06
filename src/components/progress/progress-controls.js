import React, {Component} from 'react';

export default class ProgressControls extends Component{

  render() {
    if (this.props.hasProgressEnded) {
      return <div></div>;
    }
    return (
      <div className='progress-box__controls'>
        <button onClick={() => this.pause()}>P</button>
        <button onClick={() => this.stop()}>S</button>
      </div>
    );
  }

  pause() {
    if (!this.props.timer.paused) {
      this.props.timer.pause();
    }
    else {
      this.props.timer.start();
    }
  }

  stop () {
    this.props.timer.pause();
    this.props.onStop();
  }
}