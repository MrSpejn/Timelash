import React, {Component}    from 'react';
import {Link}                from 'react-router';
import {connect}             from 'react-redux';

class Header extends Component{
  renderHeaderLinks() {
    if (this.props.authorized) {
      return [
        <li key='dashboard'><Link className='header__link' to='/dashboard'>Dashboard</Link></li>,
        <li key='weekly'><Link className='header__link' to='/dashboard/weekly'>My Week</Link></li>,
        <li key='signout'><Link className='header__link' to='/signout'>Sign Out</Link></li>

      ];
    } else {
      return [
        <li key='signin'><Link className='header__link' to='/signin'>Sign In</Link></li>
      ]
    }
  }
  render() {
    return (
      <div className='header'>
        <Link to={this.props.authorized ? '/activity' : '/'} className='header__logo'>Timelash</Link>
        <ul className='header__link-list'>
          {this.renderHeaderLinks()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {authorized: state.auth.authorized}
}
export default connect(mapStateToProps)(Header);