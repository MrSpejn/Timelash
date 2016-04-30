import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export default function(WrappedComponent) {
    class RequireAuth extends Component {
      componentWillMount() {
        if (!this.props.authorized) {
          browserHistory.push('/signin');
        }
      }
      render() {
        return <WrappedComponent />
      }
    }
    return connect((s) => {return {authorized: s.auth.authorized}})(RequireAuth);
}