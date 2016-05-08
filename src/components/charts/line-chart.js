import React, {Component}     from 'react';
import d3                     from 'd3';
import moment                 from 'moment';
let width  = 920;
let height = 400;
let margin = 40;

class LineChart extends Component {
  componentDidMount() {
    width = document.getElementById(this.props.id).clientWidth - margin;
    height = document.getElementById(this.props.id).clientHeight - 20;

    const {data, data2} = this.generatePlaceholderData();
    const chartData = [data, data2].map((d, i) => {
      const colors = [ 'brand-blue', 'brand-orange'];
      return {  data: d, color: colors[i] };
    });
    const {xScale, yScale} = this.createScales(data);
    const {xAxis, yAxis} = this.createAxis(xScale, yScale);
    const svg = d3.select(`#${this.props.id}`);

    svg.append('g').call(xAxis).attr('class', 'x axis').attr('transform', `translate(0, ${height})`);
    svg.append('g').call(yAxis).attr('class', 'y axis').attr('transform', `translate(${margin}, 0)`);

    svg.append('circle').attr('class', 'aura').style({'r': 2, cx: -10, cy: -10});
    chartData.forEach((d) => {
      this.drawLine(d, svg, xScale, yScale);
    });
  }

  createScales() {
    const xScale = d3.time.scale().range([margin, width + margin - 8]);
    const yScale = d3.scale.linear().range([height, 20]);
    xScale.domain([this.props.beginDate, this.props.endDate]);
    yScale.domain([0, 1]);
    return {xScale, yScale};
  }

  createAxis(xScale, yScale) {
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(7)
                    .innerTickSize(-height+20).outerTickSize(0).tickPadding(10)
                    .tickFormat(date => moment(date).format('DD MMM'));

    const yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(12)
                    .innerTickSize(-width+8).outerTickSize(0).tickPadding(10);

    return {xAxis, yAxis};
  }

  drawLine(obj, chart, xScale, yScale) {
    const line = d3.svg.line().x(d => xScale(d.date)).y(d => yScale(d.value));
    line.interpolate('monotone');
    const area = d3.svg.area().x(d => xScale(d.date)).y1(d => yScale(d.value)).y0(height);
    area.interpolate('monotone');

    chart.append('path').attr('class', `line line-${obj.color}`).attr('d', line(obj.data));
    chart.append('path').attr('d', area(obj.data)).attr('class', `area-${obj.color}`);
    chart.selectAll(`.circle-${obj.color}`).data(obj.data).enter()
         .append('circle')
         .attr('class', `circle-${obj.color}`).style({
           'r': 5,
           cx: (d) => xScale(d.date),
           cy: (d) => yScale(d.value)
         })
         .on('mouseover', function (d) {
           chart.select('.aura').attr('class', `aura line-${obj.color}`)
           .style({
             r: 9,
             cx: xScale(d.date),
             cy: yScale(d.value)
           });
         })
         .on('mouseout', function () {
           chart.select('.aura').style({r: 2, cx: -10, cy: -10});
         })
  }

  generatePlaceholderData() {
    const beginDate = this.props.beginDate;
    const base = Math.random();

    const data = d3.range(this.props.endDate.diff(beginDate, 'days') + 1).map((v, i) => {
      const value = base - (Math.random() * 0.1);
      return {
        value: value > .5 ? value : value + .5,
        date: beginDate.clone().add(i, 'days')
      };
    });
    const data2 = data.map(({value: v, date: d}) => {
      const value = (v - (Math.random() * 0.25)) * 0.9;
      return {
        value: value > 0 ? value : 0,
        date: d
      };
    });
    return {data, data2};
  }

  render() {
    return (
      <svg className='line-chart' {...this.props}>
        <defs>
          <linearGradient id='gradient-blue' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' style={{'stopColor': 'rgb(31, 119, 180)', 'stopOpacity': '0.07'}} />
            <stop offset='10%' style={{'stopColor': 'rgb(31, 119, 180)', 'stopOpacity': '0.12'}} />
            <stop offset='50%' style={{'stopColor': 'rgb(31, 119, 180)', 'stopOpacity': '0'}} />
          </linearGradient>
          <linearGradient id='gradient-orange' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' style={{'stopColor': 'rgb(255, 127, 14)', 'stopOpacity': '0.07'}} />
            <stop offset='30%' style={{'stopColor': 'rgb(255, 127, 14)', 'stopOpacity': '0.12'}} />
            <stop offset='100%' style={{'stopColor': 'rgb(255, 127, 14)', 'stopOpacity': '0'}} />
          </linearGradient>
        </defs>
      </svg>
  );
  }
}
export default LineChart;