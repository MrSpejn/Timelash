import React, {Component}     from 'react';
import d3                     from 'd3';
import moment                 from 'moment';
import * as colors            from '../../colors';

class MonthChart extends Component {

  componentDidMount() {
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }

  createChart() {
    let top = 0, left = 0, right = 0, bottom = 0;
    const margins = this.props.margins;
    if (margins) {
      if (typeof margins === 'object') {
        top = margins.top || 0;
        right = margins.right || 0;
        bottom = margins.bottom || 0;
        left = margins.left || 0;
      }
    }
    const _this = this;
    const innerWidth = document.getElementById(this.props.id).clientWidth - left - right;
    const innerHeight= this.props.height - top - bottom;
    const chart      = d3.select(`#${this.props.id}`);

    this.beginDate   = this.getBeginningDate();
    this.endDate     = this.getEndingDate();
    const days       = this.createPlaceholderData();

    const xScale     = d3.scale.linear().range([left, innerWidth + left]).domain([0, 7]);
    const yScale     = d3.scale.linear().range([top, innerHeight + top])
                        .domain([0, (days.length / 7)]);

    const cellWidth  = innerWidth / 7;
    const cellHeight = innerHeight / (days.length / 7);

    this.drawHeader(chart, xScale, innerWidth);

    chart.append('g').selectAll('.day').data(days).enter().append('rect')
      .attr('fill', day => this.controlFillColor(day))
      .attr('class', day => `day ${day.valid ? 'valid' : 'invalid'}`)
      .style({
        'stroke-width': 1,
        'stroke': colors.gray_light,
        'width' : cellWidth,
        'height': cellHeight,
        x: day => xScale(day.offset % 7),
        y: day => yScale(Math.floor(day.offset / 7))
      })
      .on('mouseover', function (d) {
        if (d.valid) {
          d3.select(this).attr('fill', colors.darken(_this.controlFillColor(d), -40));
        }
      })
      .on('mouseout', function (d) {
        if (d.valid) {
          d3.select(this).attr('fill', _this.controlFillColor(d), 40);
        }
      });
  }

  drawHeader(chart, xScale, innerWidth) {
    const values = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    chart.selectAll('.heading').data(d3.range(7)).enter().append('text')
         .attr('class', 'heading')
         .attr('text-anchor', 'middle')
         .text(i => values[i])
         .attr('x', day => xScale(day) + (innerWidth / 14))
         .attr('y', 20);
  }

  createPlaceholderData() {
    return d3.range(this.endDate.diff(this.beginDate, 'days') + 1)
      .map(offset => {
        return {
          offset: offset,
          date: this.beginDate.clone().add(offset, 'days'),
          spent: Math.random() * 4
        };
      });
  }

  getBeginningDate() {
    let date = moment(this.props.month,'MMMM').startOf('month');
    if (date.day() === 0) {
      date.subtract(1, 'day');
    }
    date.startOf('week');
    date.add(1, 'day');
    return date;
  }

  getEndingDate() {
    let date = moment(this.props.month,'MMM').endOf('month');
    if (date.day() === 0) {
      date.subtract(1, 'day');
    }
    return date.endOf('week').add(1, 'day');
  }

  controlFillColor(day) {
    if (day.valid || this.isSelectedMonth(day)) {
      if (day.spent >= 3) return colors.brand_blue_30;
      if (day.spent >= 2) return colors.brand_blue_40;
      if (day.spent >= 1) return colors.brand_blue_50;
      return colors.white_light;

    }
    return colors.white_darker;
  }

  isSelectedMonth(day) {
    if (moment(this.props.month, 'MMM').month() === day.date.month()) {
      day.valid = true;
      return true;
    }
    day.valid = false;
    return false;
  }

  render() {
    const attr = {};
    for (let prop in this.props) {
      if (this.props.hasOwnProperty(prop) && prop !== 'margins') {
        attr[prop] = this.props[prop];
      }
    }
    return (
      <svg className="month-chart" {...attr}></svg>
    )
  }
}
export default MonthChart