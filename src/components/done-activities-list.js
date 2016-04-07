import React, {Component}        from 'react';
import leftPad                   from '../left-pad.util';

export default class DoneActivitiesList extends Component {
  render() {
    const activities = this.props.activities.map((act) => {
      return (
        <li>
          {act.name}
          <span className="hours">
            {`${Math.floor(act.time / 60)}:${leftPad(act.time % 60, 2, '0')}`}
          </span>
        </li>
      );
    });

    return (
      <ul className="done-activities-list">
        {activities}
      </ul>
    );
  }
}