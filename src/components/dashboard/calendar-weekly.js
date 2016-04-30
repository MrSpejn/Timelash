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

  renderHeaders() {
    return this.days.map((date, i) => {
      return (
        <li key={i}>
          {date.format('Do MMM')}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="weekly-calendar">
        <ul className="weekly-calendar__header">{this.renderHeaders()}</ul>
        {this.state.shouldDisplayHint ? <CalendarHint options={this.state.hintOptions}/> : <div></div>}
        <svg id="calendar" width="1036" height="600"></svg>
      </div>
    )
  }
}