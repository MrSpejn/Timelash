import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import categories                from '../categories';

export default class ChooseActivityList extends Component {
  render() {
    return (
      <ul className='choose-activity-list'>
        {this.renderCategories()}
      </ul>
    );
  }

  renderCategories() {
    return categories.map((cat) => {
      return (
        <li key={cat.id} onClick={() => { this.startProgressIfPossible(cat) }}>
          {cat.name}
          <ul>
            {this.renderItems(cat)}
          </ul>
        </li>
      );
    });
  }

  renderItems(category) {
    return category.items.map((act) => {
      return (
        <li key={act.id}>
          {act.name}
        </li>
      );
    });
  }

  startProgressIfPossible(progress) {
    const current = this.props.progress;
    if (!current || current.time === current.checkpoint) {
      this.props.startProgress(progress);
    }
  }
}