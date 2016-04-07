import React, {Component} from 'react';
import {setShadow, strokeCircle} from '../canvas.util';

export default class CurrentActivity extends Component {
  componentDidMount() {
    const ctx = this._canvas.getContext('2d');
    ctx.setShadow = setShadow;
    ctx.strokeCircle = strokeCircle;
    this.context = ctx;
    this.paintRing(this.props.currentValue / this.props.maxValue * 360);
  }

  componentDidUpdate() {
    this.paintRing(this.props.currentValue / this.props.maxValue * 360);
  }

  render() {
    return (
        <canvas className='current-activity__canvas'
                width='400'
                height='400'
                ref={(el) => this._canvas = el} >
        </canvas>
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