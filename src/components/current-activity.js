import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import {changeActivityTime}      from '../actions/index';
import leftPad                   from '../left-pad.util';
import CanvasTimeProgress        from '../components/canvas-time-progress';

class CurrentActivity extends Component{

   componentDidMount() {
     this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 1000);
   }
   oneSecondPassed() {
     const activity = this.props.activity;

     if(activity.time  !== activity.checkpoint) {
       this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 1000);
       this.props.changeActivityTime(activity.time + 1);
     }
   }

   toggleTimer() {
     const activity = this.props.activity;
     if (!this.timer && activity.time  !== activity.checkpoint) {
       this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 500);
     }
     else {
       window.clearTimeout(this.timer);
       this.timer = null;
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

   //
  //  paintRing(degrees) {
  //    const ringWidth = 30;
  //    const canvasWidth = 400;
  //    const canvasHeight = 400;
  //    const ctx = this.context;
   //
  //    ctx.save();
  //    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //    ctx.lineWidth = ringWidth;
   //
  //    ctx.beginPath();
  //    ctx.arc(canvasHeight/2, canvasWidth/2, canvasWidth/2, radians(-90), radians(degrees-90));
  //    ctx.lineTo(200, 200);
  //    ctx.clip();
   //
  //    ctx.strokeStyle = '#22c0f7';
  //    ctx.setShadow();
  //    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth-ringWidth) / 2);
   //
  //    ctx.setShadow(5, 5, 2, '#0794c5');
  //    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth+ringWidth) / 2);
  //    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth - 3*ringWidth) / 2);
   //
  //    ctx.restore();
  //  }
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