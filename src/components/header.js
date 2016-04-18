import React      from 'react';
import {Link}     from 'react-router';

export default () => {
  return (
    <div className='header'>
      <Link to={'/'} className='header__logo'>Timelash</Link>
      <ul className='header__link-list'>
        <li><Link className='header__link' to={'/dashboard'} >Dashboard</Link></li>
      </ul>
    </div>
);
}