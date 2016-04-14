import React from 'react';

export default (props) => {
  return (
    <ul className="history-list__filters">
        <li>
          <a className="history-list__filter-item"
             onClick={() => props.changeFilter('LASTHOUR')}>
              Last hour
          </a>
        </li>
        <li>
          <a className="history-list__filter-item"
             onClick={() => props.changeFilter('TODAY')}>
              Today
          </a>
        </li>
        <li>
          <a className="history-list__filter-item"
             onClick={() => props.changeFilter('YESTERDAY')}>
              Yesterday
          </a>
        </li>
    </ul>
  )
}