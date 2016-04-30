import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';

import categories                from '../categories';
import {startProgress}           from '../actions/progress';

class ChooseActivityList extends Component {
  startProgressIfPossible(progress) {
    const current = this.props.progress;
    if (!current || current.time === current.checkpoint) {
      this.props.startProgress(progress);
    }
  }

  renderCategories() {
    return categories.map((cat) => {
      return (
        <li key={cat.id}>
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
        <li key={act.id} onClick={() => { this.startProgressIfPossible(act) }}>
          {act.name}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className='choose-activity-list'>
        {this.renderCategories()}
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startProgress}, dispatch);
}

export default connect(null, mapDispatchToProps)(ChooseActivityList);