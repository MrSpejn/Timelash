import { FETCH_HISTORY, ADD_TO_HISTORY } from './types';
import moment from 'moment';

export function fetchHistory() {
  const history = JSON.parse(localStorage.getItem('History')) || [];

  return {
    type: FETCH_HISTORY,
    payload: history.map((story) => {
        story.date = moment(story.date);
        return story;
    })
  };
}

export function addToHistory(activity) {
  const currentHistory = JSON.parse(localStorage.getItem('History')) || [];
  currentHistory.push(activity);
  localStorage.setItem('History', JSON.stringify(currentHistory));

  return {
    type: ADD_TO_HISTORY,
    payload: activity
  }
}