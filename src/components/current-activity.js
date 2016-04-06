import React, {Component} from 'react';

import {setShadow, strokeCircle} from '../canvas.util.js';
import leftPad from '../left-pad.util.js';

 export default class CurrentActivity extends Component{
   constructor() {
     super();
     this.state = {time: 0};
     this.max = 10;
   }

   componentDidMount() {
     const ctx = this._canvas.getContext('2d');
     ctx.setShadow = setShadow;
     ctx.strokeCircle = strokeCircle;
     this.context = ctx;

     this.paintRing(this.state.time * 360 / this.max);
     this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 1000);
   }
   oneSecondPassed() {
     this.setState({time: this.state.time + 1});
     if(this.state.time !== this.max) {
       this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 1000);
     }
   }

   componentDidUpdate() {
     this.paintRing(this.state.time * 360 / this.max);
   }

   toggleTimer() {
     if (!this.timer && this.state.time !== this.max) {
       this.timer = window.setTimeout(this.oneSecondPassed.bind(this), 500);
     }
     else {
       window.clearTimeout(this.timer);
       this.timer = null;
     }
   }

   render() {
     const timer = `${Math.floor(this.state.time / 60)}:${leftPad(this.state.time % 60, 2, "0")}`;

     return (
       <div className='current-activity'>
         <div className='current-activity__activity-name'>Running</div>
         <div className='current-activity__timer'>{this.state.time !== this.max ? timer : 'Koniec'}</div>
         <div className='current-activity__controls'>
           <button onClick={() => this.toggleTimer()}>P</button>
           <button>S</button>
         </div>
         <canvas className='current-activity__canvas' width='400' height='400' ref={(el) => this._canvas = el} ></canvas>
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
};
