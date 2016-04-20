import React, {Component}     from 'react';
import moment                 from 'moment';

import CalendarSvg            from '../../calendar.svg';

export default class CalendarWeeklyComponent extends Component{
  constructor() {
    super();
    this.days = [];
    const startingDate = moment().startOf('week');
    let date = startingDate;

    for (let i = 0; i < 7; i++) {
      this.days.push(date);
      date = date.clone().add(1, 'day');
    }
  }
  componentDidMount() {
    const currentHistory = JSON.parse(localStorage.getItem('History')) || [];
    const start = moment().startOf('week');
    const end   = start.clone().add(7, 'days');

    currentHistory.filter((story) => {
      if (moment(story.date) > start && moment(story.date) < end) {
        return true;
      }
    });

    const calendar = new CalendarSvg('#calendar', currentHistory);
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
  paint() {

  }
  render() {
    return (
      <div className="weekly-calendar">
        <ul className="weekly-calendar__header">{this.renderHeaders()}</ul>
        <svg id="calendar" width="1036" height="600"></svg>
      </div>
    )
  }
}