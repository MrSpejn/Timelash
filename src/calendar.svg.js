import Snap                   from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import moment                 from 'moment';

const SECONDS_IN_DAY     = 3600 * 24;
const MILISECONDS_IN_DAY = 1000 * SECONDS_IN_DAY;

export default class CalendarSvg{
  constructor(elementID, data) {
    const element = document.querySelector(elementID);
    this.width  = element.clientWidth;
    this.height = element.clientHeight;
    this.plain  = Snap(elementID);

    this.createHorizontalLines();
    this.createYAxisLegend();
    this.createDataCells(data);
  }

  createHorizontalLines() {
    const cellHeight = Math.round(this.height / 18);
    for (let i = 0; i <= 18; i++) {
      this.plain.line(50, i * cellHeight, this.width, i * cellHeight);
    }
  }

  createYAxisLegend() {
    const cellHeight = Math.round(this.height / 18);

    for (let i = 1; i <= 18; i++) {
      this.plain.text(60, i * cellHeight - (cellHeight - 14) / 2, `${i + 5}:00`);
    }
  }

  createDataCells(data) {
    const cellWidth = Math.round(this.width / 8);

    data.map((block) => {
      const date = moment(block.date);
      const timestamp = moment(block.date) - moment().startOf('week');

      console.log(date.hours());

      const y     = (date.hours() - 8) * Math.round(this.height / 18);
      const x     = Math.floor(timestamp / MILISECONDS_IN_DAY) * cellWidth + cellWidth;
      const height= Math.round(block.time / 3600 / 18 * this.height);

      this.plain.rect(x, y, cellWidth, height);
    })
  }
}