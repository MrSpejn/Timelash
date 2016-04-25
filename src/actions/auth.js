import {SIGN_IN, SIGN_OUT} from './types';
import axios               from 'axios';
import {browserHistory}    from 'react-router';

const API_URL = 'http://localhost:3000';
export function userSignin({login, password}) {
  return function(dispatch) {
    axios.post(`${API_URL}/signin`, {email:login, password})
      .then(res => {
        dispatch({
          type: SIGN_IN,
          payload: null
        });
        localStorage.setItem('token', res.data.token);
        browserHistory.push('/current');
      })
      .catch(e => {
        console.log(e);
      });
  }
}

export function userSignout() {
  localStorage.removeItem('token');
  browserHistory.push('/');
  return {
    type: SIGN_OUT
  };
}