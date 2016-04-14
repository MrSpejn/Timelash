import React, {Component}        from 'react';
import leftPad                   from '../left-pad.util';

import HistoryListFilters        from '../components/history-list-filters';

export default class HistoryList extends Component {
  constructor() {
    super();
    this.state = {'filter':'LASTHOUR'};
  }

  doesPassFilter() {
    return true;
  }

  renderHistoryItems() {
    return this.props.history.filter(this.doesPassFilter.bind(this)).map((s, i) => {
      return this.renderSingleStory(s, i);
    });
  }

  renderSingleStory(story, idx) {
    return (
      <li key={idx}>
        <em className="date">{story.date.format('hh:mmA')}</em>
        {story.name}
        <span className="spent-time">
          {`${Math.floor(story.time / 60)}:${leftPad(story.time % 60, 2, '0')}`}
        </span>
      </li>
    );
  }

  render() {
    return (
      <ul className="history-list">
        <HistoryListFilters changeFilter={(f) => {this.setState({'filter': f})}}/>
        {this.renderHistoryItems()}
      </ul>
    );
  }
}