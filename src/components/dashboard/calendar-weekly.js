import React, {Component}     from 'react';
import moment                 from 'moment';
import CalendarSvg            from '../../utilities/svg-calendar';
import ChartHint              from '../charts/chart-hint';

export default class CalendarWeeklyComponent extends Component{
  constructor() {
    super();
    this.state = {shouldDisplayHint: false, story: false, hintOptions: null};
    this.days = [];
    const startingDate = moment().startOf('week');
    let date = startingDate;

    for (let i = 0; i < 7; i++) {
      this.days.push(date);
      date = date.clone().add(1, 'day');
    }
  }

  componentDidMount() {
    const calendar = new CalendarSvg('#calendar');

    calendar.onElementMouseOver((element, story) => {
      const hintOptions = {
        x: parseInt(element.node.attributes.x.value),
        y: parseInt(element.node.attributes.y.value),
        targetWidth: parseInt(element.node.attributes.width.value),
        targetHeight: 500 / 3600 * story.time / 60,
        display: 'horizontal'
      };
      this.setState({
        hintOptions,
        story,
        shouldDisplayHint: true
      });
    });

    calendar.onElementMouseOut(() => {
      this.setState({
        shouldDisplayHint: false
      });
    });
  }

  render() {
    return (
      <div className="weekly-calendar__hint-container">
        {this.state.shouldDisplayHint &&
          <ChartHint options={this.state.hintOptions}>
            <h3>{this.state.story.name}</h3>
            <span><em>Started: </em>{this.state.story.date.format('hh:mm A')}</span><br />
            <span><em>Duration: </em>{Math.round(this.state.story.time / 60)}min</span>
          </ChartHint>

      }
        <svg id="calendar" width="100%" height="500"></svg>
      </div>
    )
  }
}