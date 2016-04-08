import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import {changeProgressTime,
        endProgress,
        addActivity}             from '../actions/index';
import leftPad                   from '../left-pad.util';
import Timer                     from '../timer.util';
import CanvasTimeProgress        from '../components/canvas-time-progress';

class CurrentActivity extends Component{

   componentDidMount() {
     this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
     this.timer.start();
   }
   componentDidUpdate() {
     if (this.props.progress.time === 0) {
       this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
       this.timer.start();
     }
     if (this.props.progress.time === this.props.progress.checkpoint) {
       this.timer.pause();
       this.props.addActivity(this.props.progress);

       var options = {
          icon: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/clock-icon.png'
       };
       new Notification("Your activity has ended", options);
     }
   }
   oneSecondPassed() {
     const progress = this.props.progress;

     if(progress.time  !== progress.checkpoint) {
       this.props.changeProgressTime(progress.time + 1);
     }
   }

   endProgress() {
     this.timer.pause();
     this.props.endProgress();
     this.props.addActivity(this.props.progress);
   }

   pauseProgress() {
     const progress = this.props.progress;
     if (this.timer.paused && progress.time  !== progress.checkpoint) {
       this.timer.start();
     }
     else {
       this.timer.pause();
     }
   }

   render() {
     const progress = this.props.progress;
     const time = `${leftPad(Math.floor(progress.time / 60), 2, '0')}:${leftPad(progress.time % 60, 2, '0')}`;
     const hasProgressEnded = progress.time === progress.checkpoint;



     return (
           <div className='current-activity'>
             <div className='current-activity__activity-name'>{progress.name}</div>
             <div className='current-activity__timer'>
               { !hasProgressEnded ? time : 'Koniec'}
             </div>
             {this.renderControls(hasProgressEnded)}
             <CanvasTimeProgress currentValue={progress.time} maxValue={progress.checkpoint} />
           </div>
     );
   }
   renderControls(hasProgressEnded) {
     if(hasProgressEnded) {
       return;
     }
     return(
          <div className='current-activity__controls'>
           <button onClick={() => this.pauseProgress()}>P</button>
           <button onClick={() => this.endProgress()}>S</button>
         </div>
     );
   }
 }

function mapStateToProps(state) {
  return {
    progress: state.progress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeProgressTime, endProgress, addActivity}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentActivity);