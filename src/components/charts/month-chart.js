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

    const innerWidth = document.getElementById(this.props.id).clientWidth - left - right;
    const innerHeight= this.props.height - top - bottom;
    const chart      = d3.select(`#${this.props.id}`);
    const xScale     = d3.scale.linear().range([left, innerWidth + right]).domain([0, 7]);

    this.beginDate   = this.getBeginningDate();
    this.endDate     = this.getEndingDate();
    const days       = d3.range(this.endDate.diff(this.beginDate, 'days') + 1)
                         .map(offset => {
                           return {
                             offset: offset,
                             date: this.beginDate.clone().add(offset, 'days'),
                             spent: Math.random() * 4
                           };
                         });

    const yScale    = d3.scale.linear().range([top, innerHeight + bottom])
                        .domain([0, (days.length / 7)]);

    const _this = this;
    chart.append('g').selectAll('.day').data(days).enter().append('rect')
      .attr('fill', day => this.controlFillColor(day))
      .attr('class', day => `day ${day.valid ? 'valid' : 'invalid'}`)
      .style({
        'stroke-width': 1,
        'stroke': colors.gray_light,
        'width' : innerWidth / 7 - 6,
        'height': innerHeight / (days.length / 7),
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