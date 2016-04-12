import React, {Component} from 'react';

export default class ProgressControls extends Component{
  
  renderButtons() {
    if (!this.props.hasProgressEnded) {
      return(
        <button onClick={() => this.pause()}>P</button>
        <button onClick={() => this.stop()}>S</button>
      );
    }
  }

  render() {
    return (
      <div className='current-activity__controls'>
        {this.renderButtons()}
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