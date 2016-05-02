import { FETCH_HISTORY, ADD_TO_HISTORY } from './types';
import axios  from 'axios';
import moment from 'moment';

const API_URL = 'http://localhost:3000/history';

export function fetchHistory() {
  return function (dispatch) {
      const token = localStorage.getItem('token');
      axios.get(API_URL, {headers: {authorization: token}})
      .then(res => {
        const payload = res.data.map(item => {
          item.date = moment(item.date);
          return item;
        });
        dispatch({ type: FETCH_HISTORY, payload});
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export function addToHistory(activity) {
  return function (dispatch) {
    const token = localStorage.getItem('token');
    axios.post (API_URL, activity, {headers: {authorization: token}})
    .then(res => {
      dispatch({ type: ADD_TO_HISTORY, payload: activity});
    })
    .catch(err => {
      console.log(err);
    });
  }
}