import moment from 'moment';

import {CHANGE_PROGRESS_TIME, START_PROGRESS, END_PROGRESS, FETCH_UNFINISHED_PROGRESS} from './types';

export function changeProgressTime(time) {
  return {
    type: CHANGE_PROGRESS_TIME,
    payload: time
  };
}

export function startProgress(progress) {
  return {
    type: START_PROGRESS,
    payload: progress
  }
}

export function endProgress() {
  return {
    type: END_PROGRESS,
    payload: null
  }
}

export function fetchUnfinishedProgress() {
  const taskInStorage = JSON.parse(localStorage.getItem('progress'));
  localStorage.setItem('progress', null);

  if (taskInStorage) {
    taskInStorage.date = moment(taskInStorage.date);
    const sec = (moment().valueOf() - taskInStorage.date.valueOf()) / 1000;

    if (sec > taskInStorage.checkpoint) {
      taskInStorage.time = taskInStorage.checkpoint;
    }
    else {
      taskInStorage.time = Math.round(sec);
    }
  }

  return {
    type: FETCH_UNFINISHED_PROGRESS,
    payload: taskInStorage
  }
}