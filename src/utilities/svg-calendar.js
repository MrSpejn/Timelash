import Snap                   from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';
import moment                 from 'moment';

import * as colors            from '../colors';

const SECONDS_IN_DAY     = 3600 * 24;
const MILISECONDS_IN_DAY = 1000 * SECONDS_IN_DAY;

const fakeData = [
  {
    date: moment(new Date('May 4 2016 9:00:00 GMT+0200')),
    time: 7900,
    name: 'Training'
  },
  {
    date: moment(new Date('May 1 2016 9:30:00 GMT+0200')),
    time: 3600,
    name: 'Training'
  },
  {
    date: moment(new Date('May 3 2016 14:00:00 GMT+0200')),
    time: 7200,
    name: 'Training'
  },
  {
    date: moment(new Date('May 3 2016 9:00:00 GMT+0200')),
    time: 18000,
    name: 'Angie'
  },
  {
    date: moment(new Date('May 1 2016 16:47:00 GMT+0200')),
    time: 4500,
    name: 'Swimming'
  },
  {
    date: moment(new Date('May 1 2016 10:30:00 GMT+0200')),
    time: 5400,
    name: 'Angie'
  },
  {
    date: moment(new Date('May 1 2016 16:17:00 GMT+0200')),
    time: 1800,
    name: 'Wash dishes'
  },
  {
    date: moment(new Date('May 3 2016 8:00:00 GMT+0200')),
    time: 3600,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('May 2 2016 10:00:00 GMT+0200')),
    time: 10800,
    name: 'Swimming'
  },
  {
    date: moment(new Date('May 4 2016 12:30:00 GMT+0200')),
    time: 6400,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('May 5 2016 13:00:00 GMT+0200')),
    time: 7200,
    name: 'Swimming'
  },
  {
    date: moment(new Date('May 3 2016 16:00:00 GMT+0200')),
    time: 5400,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('May 6 2016 12:30:00 GMT+0200')),
    time: 5400,
    name: 'Training'
  },
  {
    date: moment(new Date('May 1 2016 12:00:00 GMT+0200')),
    time: 15400,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('May 5 2016 10:00:00 GMT+0200')),
    time: 8800,
    name: 'Project ICT'
  },
  {
    date: moment(new Date('May 7 2016 10:00:00 GMT+0200')),
    time: 7200,
    name: 'Angie'
  },
  {
    date: moment(new Date('May 2 2016 13:00:00 GMT+0200')),
    time: 4500,
    name: 'Wash dishes'
  },
  {
    date: moment(new Date('May 4 2016 11:30:00 GMT+0200')),
    time: 3600,
    name: 'Wash dishes'
  },
  {
    date: moment(new Date('May 5 2016 15:00:00 GMT+0200')),
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
    this.margin         = 60;
    this.yAxis          = 60;
    this.xAxis          = 20;
    this.cellWidth      = Math.round((this.width - this.yAxis - 2 * this.margin)/ 7);
    this.cellHeight     = this.height / 18;

    this.createGrid();
    this.createXAxis();
    this.cells = this.createDataCells(fakeData);
    this.mapHandlersToCells();

  }

  createXAxis() {
    let day = moment().startOf('week');
    for (let i = 0; i < 7; i++) {
      const x = this.margin + this.yAxis + (i + 0.5) * this.cellWidth;
      this.plain.text(x, this.margin, day.format('DD MMM'))
        .attr({'font-size': '16px', 'text-anchor': 'middle'});
      day = day.add(1, 'day');
    }
  }

  createGrid() {
    const cellHeight = this.cellHeight;
    const margin = this.margin;
    const xAxis = this.xAxis;

    this.plain.line(margin + this.yAxis - 15, margin + xAxis, this.width - margin, margin + xAxis);
    for (let i = 1; i <= 18; i++) {
      const height = i * cellHeight + margin + xAxis;

      this.plain.line(margin + this.yAxis - 15, height, this.width - margin, height);
      this.plain.text(margin + this.yAxis - 20, height - cellHeight + 5, `${i + 5}:00`)
        .attr({'font-size': '14px', 'text-anchor': 'end'});
    }

  }

  mapHandlersToCells() {
    this.cells.map((cell) => {
      cell.mouseover(() => {
          const baseFill = cell.node.attributes.fill.value
          cell.attr({'fill': colors.darken(baseFill, -40)});
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

    return Math.floor(timestamp / MILISECONDS_IN_DAY) * this.cellWidth + this.yAxis + this.margin;
  }

  calculateY(date) {
    const maxTime = 18 * 60;
    const time = (date.hours() - 6) * 60 + date.minutes();

    return Math.floor(time/maxTime * this.height) + this.margin + this.xAxis;
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
      return colors.brand_orange;
    case 'Swimming':
      return colors.brand_blue_20;
    case 'Training':
      return colors.brand_orange_10;
    case 'Project ICT':
      return colors.brand_blue;
    case 'Wash dishes':
      return colors.brand_blue_10;
    default:
      return colors.brand_orange_30;
  }
}