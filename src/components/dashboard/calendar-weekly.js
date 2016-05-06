import React, {Component}     from 'react';
import moment                 from 'moment';
import CalendarSvg            from '../../utilities/svg-calendar';
import CalendarHint           from './calendar-hint';

export default class CalendarWeeklyComponent extends Component{
  constructor() {
    super();
    this.state = {shouldDisplayHint: false, hintOptions: null};
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

    calendar.onElementMouseOver((element, story, event) => {
      const hintOptions = {
        x: parseInt(element.node.attributes.x.value),
        y: parseInt(element.node.attributes.y.value) + 90,
        targetWidth: parseInt(element.node.attributes.width.value),
        item: story
      };
      this.setState({
        hintOptions,
        shouldDisplayHint: true
      });
    });

    calendar.onElementMouseOut((element, story, event) => {
      this.setState({
        shouldDisplayHint: false
      });
    });
  }

  render() {
    return (
      <div className="weekly-calendar-module">
        {this.state.shouldDisplayHint ? <CalendarHint options={this.state.hintOptions}/> : <div></div>}
        <div className="weekly-calendar">
          <h3 className="section-title">Calendar of weekly activities</h3>
          <svg id="calendar" width="1036" height="500"></svg>
        </div>
      </div>
    )
  }
}