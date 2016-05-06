import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userSignout} from 'actions/auth';

class Signout extends Component{
  componentWillMount() {
    this.props.userSignout();
  }
  render() {
    return (<h2 className="signout">Goodbye, our dear friend</h2>);
  }
}
export default connect(null, {userSignout})(Signout);