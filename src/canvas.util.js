export function setShadow(x = 0, y = 0, blur = 0, color = 'transparent') {
  this.shadowOffsetX  = x;
  this.shadowOffsetY  = y;
  this.shadowBlur     = blur;
  this.shadowColor    = color;
}

export function strokeCircle(x, y, r) {
  this.beginPath();
  this.arc(x, y, r, 0, 2 * Math.PI);
  this.stroke();
}