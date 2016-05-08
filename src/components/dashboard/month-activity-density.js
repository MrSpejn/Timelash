import React, {Component} from 'react';
import _ from 'lodash';
import MonthChart from 'components/charts/month-chart';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

class MonthActivityDensity extends Component {
  constructor() {
    super();
    const id = new Date().getMonth();
    this.state = {
      id: id,
      month: monthNames[id]
    };
  }

  render() {
    return (
      <div className='month-activity-density'>
        <div className='month-activity-density__header'>
          <a onClick={() => this.changeMonth(-1)} className={this.arrowClass('left')}>
             <i className="glyphicon glyphicon-chevron-left" aria-hidden="true"></i>
          </a>
           <span className='month-activity-density__current-value'>
            {_.upperFirst(this.state.month)}
          </span>
          <a onClick={() => this.changeMonth(1)} className={this.arrowClass('right')}>
             <i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i>
          </a>
        </div>
        <MonthChart id='activity-calendar'
                    month={this.state.month}
                    width='100%'
                    height='260'
                    margins={{top: 10, left: 40}}/>
      </div>
    );
  }
  arrowClass(direction) {
    let disabled = '';
    if (direction === 'left' && this.state.id === 0) {
      disabled = 'month-activity-density__control--disabled';
    }
    if (direction === 'right' && this.state.id === 11) {
      disabled = 'month-activity-density__control--disabled';
    }
    return `month-activity-density__control ${disabled}`
  }
  changeMonth(offset) {
    let id = this.state.id + offset;
    if (id < 0 || id > 11) {
      return;
    }

    this.setState({ id: id, month: monthNames[id] });
  }
}

export default MonthActivityDensity;