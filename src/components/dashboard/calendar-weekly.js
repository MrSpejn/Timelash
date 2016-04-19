import React, {Component} from 'react';
import moment from 'moment';

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

  renderHeaders() {
    return this.days.map((date) => {
      return (
        <li style={{'display': 'inline-block', width: '100px'}}>
          {date.format('Do MMM')}
        </li>
      );
    });
  }
  renderDays() {

  }
  render() {
    return (
      <div>
        <ul>{this.renderHeaders()}</ul>
      </div>
    )
  }
}