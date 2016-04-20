import React, {Component} from 'react';

export default class DashboardComponent extends Component {
  render() {
    return  (
      <div className='dashboard' style={{'paddingTop': '60px'}}>
        {this.props.children}
      </div>

    );
  }
}