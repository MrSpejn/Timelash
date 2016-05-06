import React, {Component}     from 'react';
import d3                     from 'd3';

import {darken}               from '../../colors';

class PieChart extends Component{
  componentDidMount() {
    const width  = document.getElementById(this.props.name).clientWidth;
    const height = document.getElementById(this.props.name).clientHeight - 10;
    const outerRadius = Math.min(width, height * 2) * .5 - 30;
    const innerRadius = outerRadius * .5;

    var color = d3.scale.category20();
    var data = d3.range(4).map(Math.random);
    var arc = d3.svg.arc();

    var pie = d3.layout.pie().sort(null);

      const svg = d3.select(`#${this.props.name}`);

      svg.selectAll('.arc')
         .data(pie(data))
         .enter()
         .append('g')
         .attr('class', 'arc')
         .attr("transform", `translate(${width / 2},${height - 10})`)
         .append('path')
         .attr('fill', (d, i) => color(i))
         .attr('d', d => {
           d.innerRadius = innerRadius;
           d.startAngle = (d.startAngle - Math.PI) / 2;
           d.outerRadius = outerRadius;
           d.endAngle = (d.endAngle - Math.PI) / 2;
           return arc(d);
         })
         .on('mouseover', function (d, i) {
           d.outerRadius = outerRadius + 20;
           d.innerRadius = innerRadius + 5;

           d3.select(this).attr('fill', darken(color(i), -30)).attr('d', arc(d));
         })
         .on('mouseout', function (d, i) {
           d.outerRadius = outerRadius;
           d.innerRadius = innerRadius;

           d3.select(this).attr('fill', color(i)).attr('d', arc(d));
         });
  }

  render() {
    return <svg height="180" id={this.props.name}></svg>
  }
}
export default PieChart;