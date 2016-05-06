import React, {Component}        from 'react';
import {connect}                 from 'react-redux';
import {bindActionCreators}      from 'redux';
import _                         from 'lodash';
import {startProgress}           from 'actions/progress';

class ActivityList extends Component {
  startProgressIfPossible(progress) {
    const current = this.props.progress;
    if (!current || current.time === current.checkpoint) {
      this.props.startProgress(progress);
    }
  }

  renderCategories() {
    if (!this.props.activities) return <div></div>

    const categories = _.uniq(this.props.activities.map(a => a.category));
    return categories.map(cat => {
      return (
        <li className="activity-list__category" key={cat}>
          {cat}
          <ul className="activity-list__category-sublist">{this.renderItems(cat)}</ul>
        </li>
      );
    });

  }

  renderItems(cat) {
    return this.props.activities
      .filter(act => act.category === cat)
      .map(act => {
        return (
            <li key={act.name} onClick={this.startProgressIfPossible.bind(this,act)}>
              {act.name}
            </li>
        );
    });
  }

  render() {
    return (
      <ul className='activity-list'>
        {this.renderCategories()}
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({startProgress}, dispatch);
}

function mapStateToProps(state) {
  return {
    activities: state.profile.activities
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);