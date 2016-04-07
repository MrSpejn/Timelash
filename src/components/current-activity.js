import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import {changeActivityTime}      from '../actions/index';
import {setShadow, strokeCircle} from '../canvas.util.js';
import leftPad                   from '../left-pad.util.js';

class CurrentActivity extends Component{

   componentDidMount() {
     const ctx = this._canvas.getContext('2d');
     const activity = this.props.activity;

     ctx.setShadow = setShadow;
     ctx.strokeCircle = strokeCircle;
     this.context = ctx;

     this.paintRing(activity.time * 360 / activity.checkpoint);
     this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 1000);
   }
   oneSecondPassed() {
     const activity = this.props.activity;

     if(activity.time  !== activity.checkpoint) {
       this.props.changeActivityTime(activity.time + 1);
       this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 1000);
     }
   }

   componentDidUpdate() {
     const activity = this.props.activity;
     this.paintRing(activity.time * 360 / activity.checkpoint);
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
             <canvas className='current-activity__canvas'
                     width='400'
                     height='400'
                     ref={(el) => this._canvas = el} >

             </canvas>
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


   paintRing(degrees) {
     const ringWidth = 30;
     const canvasWidth = 400;
     const canvasHeight = 400;
     const ctx = this.context;

     ctx.save();
     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
     ctx.lineWidth = ringWidth;

     ctx.beginPath();
     ctx.arc(canvasHeight/2, canvasWidth/2, canvasWidth/2, radians(-90), radians(degrees-90));
     ctx.lineTo(200, 200);
     ctx.clip();

     ctx.strokeStyle = '#22c0f7';
     ctx.setShadow();
     ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth-ringWidth) / 2);

     ctx.setShadow(5, 5, 2, '#0794c5');
     ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth+ringWidth) / 2);
     ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth - 3*ringWidth) / 2);

     ctx.restore();
   }
 }

function radians(degrees) {
  return degrees * Math.PI / 180;
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