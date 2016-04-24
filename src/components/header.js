import React, {Component}    from 'react';
import {Link}                from 'react-router';

class Header extends Component{
  renderHeaderLinks() {
    if (this.props.authorized) {
      return [];
    } else {
      return [
        <li key='signin'><Link className='header__link' to='/signin'>Sign In</Link></li>
      ]
    }
  }
  render() {
    return (
      <div className='header'>
        <Link to={'/'} className='header__logo'>Timelash</Link>
        <ul className='header__link-list'>
          {this.renderHeaderLinks()}
        </ul>
      </div>
    );
  }
}
export default Header;