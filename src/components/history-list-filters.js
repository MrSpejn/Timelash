import React from 'react';

export default () => {
  return (
    <ul className="history-list__filters">
        <li><a className="history-list__filter-item">Last hour</a></li>
        <li><a className="history-list__filter-item">Today</a></li>
        <li><a className="history-list__filter-item">Yesterday</a></li>
    </ul>
  )
}