import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import {changeActivityTime}      from '../actions/index';
import leftPad                   from '../left-pad.util';
import Timer                     from '../timer.util';
import CanvasTimeProgress        from '../components/canvas-time-progress';

class CurrentActivity extends Component{

   componentDidMount() {
     this.timer = new Timer(this.oneSecondPassed.bind(this), 1000);
     this.timer.start();
   }

   oneSecondPassed() {
     const activity = this.props.activity;

     if(activity.time  !== activity.checkpoint) {
       this.props.changeActivityTime(activity.time + 1);
     }
   }

   toggleTimer() {
     const activity = this.props.activity;
     if (this.timer.paused && activity.time  !== activity.checkpoint) {
       this.timer.start();
     }
     else {
       this.timer.pause();
     }
   }

   render() {
     const activity = this.props.activity;
     const time = `${Math.floor(activity.time / 60)}:${leftPad(activity.time % 60, 2, '0')}`;
     const hasActivityEnded = activity.time === activity.checkpoint;
     return (
           <div className='current-activity'>
             <div className='current-activity__activity-name'>{activity.name}</div>
             <div className='current-activity__timer'>
               { !hasActivityEnded ? time : 'Koniec'}
             </div>
             {this.renderControls(hasActivityEnded)}
             <CanvasTimeProgress currentValue={activity.time} maxValue={activity.checkpoint} />
           </div>
     );
   }
   renderControls(hasActivityEnded) {
     if(hasActivityEnded) {
       return;
     }
     return(
          <div className='current-activity__controls'>
           <button onClick={() => this.toggleTimer()}>P</button>
           <button>S</button>
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
  return bindActionCreators({changeActivityTime}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentActivity);