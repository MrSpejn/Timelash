import {SIGN_IN, SIGN_OUT} from './types';
import axios               from 'axios';

const API_URL = 'http://localhost:3000';
export function userSignin({login, password}) {
  return function(dispatch) {
    axios.post(`${API_URL}/signin`, {email:login, password})
      .then(res => {
        dispatch({
          type: SIGN_IN,
          payload: null
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
}