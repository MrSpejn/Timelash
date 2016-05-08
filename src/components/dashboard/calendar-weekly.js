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

    calendar.onElementMouseOver((element, story) => {
      const hintOptions = {
        x: parseInt(element.node.attributes.x.value),
        y: parseInt(element.node.attributes.y.value),
        targetWidth: parseInt(element.node.attributes.width.value),
        item: story
      };
      this.setState({
        hintOptions,
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
        {this.state.shouldDisplayHint && <CalendarHint options={this.state.hintOptions}/>}
        <svg id="calendar" width="100%" height="500"></svg>
      </div>
    )
  }
}