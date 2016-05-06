import React, {Component}     from 'react';
import d3                     from 'd3';

let width  = 920;
let height = 400;
let margin = 40;

class PieChart extends Component{
  componentDidMount() {
    width = document.getElementById('line-chart').clientWidth - 2 * margin;
    height = document.getElementById('line-chart').clientHeight - 20;

    const xScale = d3.scale.linear().range([margin, width + margin]);
    const yScale = d3.scale.linear().range([height, 20]);
    const base = Math.random();

    const data = d3.range(20).map((v, i) => {
      const value = base - (Math.random() * 0.1);
      return {
        value: value > .5 ? value : value + .5,
        index: i
      };
    });
    const data2 = data.map(({value: v, index: i}) => {
      const value = (v - (Math.random() * 0.25)) * 0.9;
      return {
        value: value > 0 ? value : 0,
        index: i
      };
    });

    const xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(11)
    .innerTickSize(-height+20)
    .outerTickSize(0)
    .tickPadding(10);

    const yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(12)
    .innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10);

    xScale.domain([0, d3.max(data, d => d.index)]);
    yScale.domain([0, 1]);



    const line = d3.svg.line().x(d => xScale(d.index)).y(d => yScale(d.value)).interpolate('monotone');
    const area = d3.svg.area().x(d => xScale(d.index)).y1(d => yScale(d.value)).y0(height).interpolate('monotone');


    const svg = d3.select("#line-chart");
    svg.append('g').call(xAxis).attr('class', 'x axis').attr('transform', `translate(0, ${height})`);
    svg.append('g').call(yAxis).attr('class', 'y axis').attr('transform', `translate(${margin}, 0)`);

    svg.append('path').attr('class', 'line').attr('stroke', '#1F77B4').attr('d', line(data));
    svg.append('path').attr('class', 'area-blue').attr('d', area(data));
    svg.append('path').attr('class', 'line').attr('stroke', 'rgb(255, 127, 14)').attr('d', line(data2));
    svg.append('path').attr('class', 'area-orange').attr('d', area(data2));


    svg.selectAll('.circle-blue').data(data).enter().append('circle')
      .attr('class', 'circle-blue')
      .attr('r', 5)
      .attr('fill', '#1F77B4')
      .attr('cx', (d) => xScale(d.index))
      .attr('cy', (d) => yScale(d.value));

    svg.selectAll('.circle-orange').data(data2).enter().append('circle')
      .attr('class', 'circle-orange')
      .attr('r', 5)
      .attr('fill', 'rgb(255, 127, 14)')
      .attr('cx', (d) => xScale(d.index))
      .attr('cy', (d) => yScale(d.value));


  }

  render() {
    return (
      <svg id="line-chart" height="360">
        <defs>
          <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{"stopColor": "rgb(31, 119, 180)", "stopOpacity": "0.07"}} />
            <stop offset="10%" style={{"stopColor": "rgb(31, 119, 180)", "stopOpacity": "0.12"}} />
            <stop offset="50%" style={{"stopColor": "rgb(31, 119, 180)", "stopOpacity": "0"}} />
          </linearGradient>
          <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{"stopColor": "rgb(255, 127, 14)", "stopOpacity": "0.07"}} />
            <stop offset="30%" style={{"stopColor": "rgb(255, 127, 14)", "stopOpacity": "0.12"}} />
            <stop offset="100%" style={{"stopColor": "rgb(255, 127, 14)", "stopOpacity": "0"}} />
          </linearGradient>
        </defs>
      </svg>
  );
  }
}
export default PieChart;