import { FETCH_HISTORY, ADD_TO_HISTORY } from './types';

export function fetchHistory() {
  const history = localStorage.getItem("History");

  return {
    type: FETCH_HISTORY,
    payload: JSON.parse(history)
  }
}

export function addToHistory(activity) {
  return {
    type: ADD_TO_HISTORY,
    payload: activity
  }
}