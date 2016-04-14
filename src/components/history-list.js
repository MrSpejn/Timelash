import React, {Component}        from 'react';
import leftPad                   from '../left-pad.util';

export default class HistoryList extends Component {
  renderHistoryItems() {
    return this.props.history.map((story, i) => {
      return (
        <li key={i}>
          <em className="date">{story.date.format('hh:mmA')}</em>
          {story.name}
          <span className="hours">
            {`${Math.floor(story.time / 60)}:${leftPad(story.time % 60, 2, '0')}`}
          </span>
        </li>
      );
    });
  }
  render() {
    return (
      <ul className="done-activities-list">
        {this.renderHistoryItems()}
      </ul>
    );
  }
}