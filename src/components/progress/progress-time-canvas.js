import React, {Component} from 'react';
import {setShadow, strokeCircle} from '../../utilities/canvas';
import * as colors from '../../colors';

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
        <canvas width="330" height="330" className='progress-box__canvas'
                ref={(el) => this._canvas = el} >
        </canvas>
    );
  }

  paintRing(degrees) {
    const ringWidth = 30;
    const canvasWidth = 330;
    const canvasHeight = 330;
    const ctx = this.context;

    ctx.save();

    /* Create full circle with shadow*/
    ctx.fillStyle = colors.brand_orange_30;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = ringWidth;
    ctx.strokeStyle = colors.brand_orange_30;
    ctx.setShadow(5, 5, 2, colors.brand_orange_20);

    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth+ringWidth) / 2);
    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth - 3*ringWidth) / 2);


    /* Set clip path to trim progress circle and shadows */
    ctx.beginPath();
    ctx.arc(canvasHeight/2, canvasWidth/2, canvasWidth/2, radians(-90), radians(degrees-90));
    ctx.lineTo(canvasHeight/2, canvasWidth/2);
    ctx.clip();

    ctx.strokeStyle = colors.brand_orange_10;
    ctx.setShadow();
    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth-ringWidth) / 2);

    ctx.setShadow(5, 5, 2, colors.brand_orange);
    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth+ringWidth) / 2);
    ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth - 3*ringWidth) / 2);

    ctx.restore();
  }
}


function radians(degrees) {
  return degrees * Math.PI / 180;
}