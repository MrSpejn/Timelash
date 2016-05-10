import React, {Component} from 'react';
import moment from 'moment';

import LineChart from 'components/charts/line-chart';
import ChartHint from 'components/charts/chart-hint';

class ActivityTimeComparition extends Component {
  constructor() {
    super();
    this.state = {
      shouldDisplayHint: false
    };
  }

  displayHint() {
    const date = new Date(2000, 0, 1, 0, this.state.item.value);
    const time = `${moment(date).format('H:mm')}h`;
    return (
      <ChartHint options={this.state.hintOptions}>
        <h3>{time}</h3>
      </ChartHint>
    );
  }

  render() {
    return (
      <div className="activity-time-comparition" style={{height: 250}}>
        {this.state.shouldDisplayHint && this.displayHint()}
        <LineChart beginDate={moment('25 Apr', 'DD MMM')}
                  endDate={moment('8 May', 'DD MMM')}
                  id="categories-line-chart" height="250"
                  elementMouseover={point => this.select(point)}
                  elementMouseout ={() => this.unselect()}/>
      </div>
    );
  }

  select(point) {
    console.dir(point);
    const radius = point.attributes.r.value;
    const hintOptions = {
      x: parseInt(point.attributes.cx.value),
      y: parseInt(point.attributes.cy.value),
      targetWidth: radius * 2,
      targetHeight: radius * 2,
      containerHeight: 250,
      display: 'vertical'
    };

    this.setState({
      shouldDisplayHint: true,
      hintOptions: hintOptions,
      item: point.associatedData
    });
  }

  unselect() {
    this.setState({
      shouldDisplayHint: false
    })
  }
}

export default ActivityTimeComparition;