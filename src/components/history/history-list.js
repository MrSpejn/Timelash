import React, {Component}        from 'react';
import moment                    from 'moment';

import leftPad                   from '../../utilities/left-pad';
import HistoryListFilters        from '../../components/history/history-list-filters';

export default class HistoryList extends Component {
  constructor() {
    super();
    this.state = {'filter':'TODAY'};
  }

  doesPassFilter(story) {
    switch (this.state.filter) {
      case 'LASTHOUR':
        if (story.date > moment().subtract(1, 'hour')) {
          return true;
        }
        return false;
      case 'TODAY':
        if (story.date > moment().hours(0).minutes(0).seconds(0)) {
          return true;
        }
        return false;
      case 'YESTERDAY':
          const today = moment().hours(0).minutes(0).seconds(0);
          const yesterday = today.clone().subtract(1, 'day');

          if (story.date > yesterday && story.date < today) {
            return true;
          }
          return false;
      default:
        return true;
    }
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