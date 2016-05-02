import axios from 'axios';
import {FETCH_PROFILE, UPDATE_PROFILE} from 'actions/types';

const API_URL = 'http://localhost:3000/profile';

export function updateProfile(profile) {
  return dispatch => {
    const token = localStorage.getItem('token');
    axios.put(API_URL, profile, {headers: {authorization: token}})
    .then(res => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: profile
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
}

export function fetchProfile() {
  return dispatch => {
    const token = localStorage.getItem('token');
    axios.get(API_URL, {headers: {authorization: token}})
    .then(res => {
      dispatch({
        type: FETCH_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    })
  }
}