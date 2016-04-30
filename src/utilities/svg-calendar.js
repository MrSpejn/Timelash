import Snap                   from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import moment                 from 'moment';

const SECONDS_IN_DAY     = 3600 * 24;
const MILISECONDS_IN_DAY = 1000 * SECONDS_IN_DAY;

const fakeData = [
  {
    date: moment(new Date('Wed Apr 27 2016 9:00:00 GMT+0200')),
    time: 7900,
    name: 'Training'
  },
  {
    date: moment(new Date('Wed Apr 24 2016 9:30:00 GMT+0200')),
    time: 3600,
    name: 'Training'
  },
  {
    date: moment(new Date('Wed Apr 26 2016 14:00:00 GMT+0200')),
    time: 7200,
    name: 'Training'
  },
  {
    date: moment(new Date('Wed Apr 26 2016 9:00:00 GMT+0200')),
    time: 18000,
    name: 'Angie'
  },
  {
    date: moment(new Date('Wed Apr 24 2016 16:47:00 GMT+0200')),
    time: 4500,
    name: 'Swimming'
  },
  {
    date: moment(new Date('Wed Apr 24 2016 10:30:00 GMT+0200')),
    time: 5400,
    name: 'Angie'
  },
  {
    date: moment(new Date('Wed Apr 24 2016 16:17:00 GMT+0200')),
    time: 1800,
    name: 'Wash dishes'
  },
  {
    date: moment(new Date('Wed Apr 26 2016 8:00:00 GMT+0200')),
    time: 3600,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('Wed Apr 25 2016 10:00:00 GMT+0200')),
    time: 10800,
    name: 'Swimming'
  },
  {
    date: moment(new Date('Wed Apr 27 2016 12:30:00 GMT+0200')),
    time: 6400,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('Wed Apr 28 2016 13:00:00 GMT+0200')),
    time: 7200,
    name: 'Swimming'
  },
  {
    date: moment(new Date('Wed Apr 26 2016 16:00:00 GMT+0200')),
    time: 5400,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('Wed Apr 29 2016 12:30:00 GMT+0200')),
    time: 5400,
    name: 'Training'
  },
  {
    date: moment(new Date('Wed Apr 24 2016 12:00:00 GMT+0200')),
    time: 15400,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('Wed Apr 28 2016 10:00:00 GMT+0200')),
    time: 8800,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('Wed Apr 30 2016 10:00:00 GMT+0200')),
    time: 7200,
    name: 'Angie'
  },
  {
    date: moment(new Date('Wed Apr 25 2016 13:00:00 GMT+0200')),
    time: 4500,
    name: 'Wash dishes'
  },
  {
    date: moment(new Date('Wed Apr 27 2016 11:30:00 GMT+0200')),
    time: 3600,
    name: 'Wash dishes'
  },
  {
    date: moment(new Date('Wed Apr 28 2016 15:00:00 GMT+0200')),
    time: 3600,
    name: 'Angie'
  }
];


export default class CalendarSvg{
  constructor(elementID) {
    const element       = document.querySelector(elementID);
    this.plain          = Snap(elementID);

    this.width          = element.clientWidth;
    this.height         = element.clientHeight;
    this.cellWidth      = Math.round(this.width / 8);
    this.cellHeight     = this.height / 18;

    this.createGrid();
    this.cells = this.createDataCells(fakeData);
    this.mapHandlersToCells();

  }

  createGrid() {
    const cellHeight = this.cellHeight;
    this.plain.line(70, 0, this.width, 0);
    for (let i = 1; i <= 18; i++) {

      this.plain.line(70, i * cellHeight, this.width, i * cellHeight);
      this.plain.text(80, i * cellHeight - (this.cellHeight + 10) / 2, `${i + 5}:00`).attr({'font-size': '12px'});
    }

  }

  mapHandlersToCells() {
    this.cells.map((cell) => {
      cell.mouseover(() => {
          const baseFill = cell.node.attributes.fill.value
          cell.attr({'fill': darkenColor(baseFill, -40)});
          cell.baseFill = baseFill;
      });

      cell.mouseout(() => {
          cell.attr({'fill': cell.baseFill});
      });

      return cell;
    });
  }


  createDataCells(data) {
    return data.map((block) => {
      const x         = this.calculateX(block.date)
      const y         = this.calculateY(block.date);
      const width     = this.cellWidth;
      const height    = this.calculateHeight(block);
      const color     = getColor(block.name);

      const rect = this.plain.rect(x, y, width, height).attr({'fill': color});
      rect._story = block;
      return rect;

    });


  }
  calculateX(date) {
    const timestamp = date - moment().startOf('week');

    return Math.floor(timestamp / MILISECONDS_IN_DAY + 1) * this.cellWidth;
  }

  calculateY(date) {
    const maxTime = 18 * 60;
    const time = (date.hours() - 6) * 60 + date.minutes();

    return Math.floor(time/maxTime * this.height);
  }

  calculateHeight(block) {
    return Math.ceil(block.time / 3600 / 18 * this.height);
  }

  onElementMouseOver(executable) {
    this.cells.map((cell) => {
      cell.mouseover(executable.bind(null, cell, cell._story));
    });
  }

  onElementMouseOut(executable) {
    this.cells.map((cell) => {
      cell.mouseout(executable.bind(null, cell, cell._story));
    });
  }
}




function getColor(color) {
  switch (color) {
    case 'Angie':
      return '#9CEC5B';
    case 'Swimming':
      return '#6184DB';
    case 'Training':
      return '#50C5B7';
    case 'Project ICT':
      return '#533A71';
    case 'Wash dishes':
      return '#F0F465';
    default:
      return '#666';
  }
}
function darkenColorPercent(color, amount) {
  amount = (100 + amount) / 100;
  const number = parseInt(color.slice(1), 16);
  const red    = Math.floor((number >> 16) * amount);
  const green  = Math.floor((number >> 8 & 0x00FF) * amount);
  const blue   = Math.floor((number & 0x0000FF) * amount);
  console.log(red, green, blue);
  return `#${red > 255 ? 255 : red.toString(16)}${green > 255 ? 255 : green.toString(16)}${blue > 255 ? 255 : blue.toString(16)}`;
}


function darkenColor(color, amount) {
  const number = parseInt(color.slice(1), 16);
  const red    = (number >> 16) + amount;
  const green  = (number >> 8 & 0x00FF) + amount;
  const blue   = (number & 0x0000FF) + amount;

  return `#${red > 255 ? 255 : red.toString(16)}${green > 255 ? 255 : green.toString(16)}${blue > 255 ? 255 : blue.toString(16)}`;
}
