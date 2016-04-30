import React, {Component} from 'react';
import {setShadow, strokeCircle} from '../../utilities/canvas';

export default class ProgressTimeCanvas extends Component {
  componentDidMount() {
    const ctx = this._canvas.getContext('2d');
    ctx.setShadow = setShadow;
    ctx.strokeCircle = strokeCircle;
    this.context = ctx;
    if (typeof this.props.currentValue !== 'undefined' && this.props.maxValue ) {
      this.paintRing(this.props.currentValue / this.props.maxValue * 360);
    }
  }

  componentDidUpdate() {
    this.paintRing(this.props.currentValue / this.props.maxValue * 360);
  }

  render() {
    return (
        <canvas className='progress-box__canvas'
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

    /* Create full circle with shadow*/
    ctx.fillStyle = '#6CD5FA';
    ctx.fillRect(0, 0, 400, 400);
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = '#6CD5FA';
    ctx.setShadow(5, 5, 2, '#3daed3');

    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth+ringWidth) / 2);
    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth - 3*ringWidth) / 2);


    /* Set clip path to trim progress circle and shadows */
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