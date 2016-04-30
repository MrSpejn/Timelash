export default class Timer {
  constructor(action, tickTime) {
    this.action = action;
    this.tickTime = tickTime;
    this.paused = true;
  }
  start() {
    if (this.paused) {
      this._timer = setTimeout(this._tick.bind(this), this.tickTime);
    }
    this.paused = false;
  }
  pause() {
    clearTimeout(this._timer);
    this.paused = true;
  }
  _tick() {
    this._timer = setTimeout(this._tick.bind(this), this.tickTime);
    this.action();
  }
}