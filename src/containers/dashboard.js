import React, {Component} from 'react';

export default class DashboardComponent extends Component {
  render() {
    return  (
      <div className='dashboard'>
        <h1>DashboardComponent</h1>
        {this.props.children}
      </div>

    );
  }
}