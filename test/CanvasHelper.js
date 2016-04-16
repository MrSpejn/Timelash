import {setShadow, strokeCircle} from '../src/canvas.util';

function radians(degrees) {
  return degrees * Math.PI / 180;
}

export default function paintRing(canvas, degrees) {
  const ringWidth = 30;
  const canvasWidth = 400;
  const canvasHeight = 400;
  const ctx = canvas.getContext('2d');
  ctx.setShadow = setShadow;
  ctx.strokeCircle = strokeCircle;

  ctx.save();
  ctx.fillStyle = '#6CD5FA';
  ctx.fillRect(0, 0, 400, 400);
  ctx.lineWidth = ringWidth;
  ctx.strokeStyle = '#6CD5FA';
  ctx.setShadow(5, 5, 2, '#3daed3');
  ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth+ringWidth) / 2);
  ctx.strokeCircle(canvasHeight/2, canvasWidth/2, (canvasWidth - 3*ringWidth) / 2);


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