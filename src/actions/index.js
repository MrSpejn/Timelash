import {CHANGE_PROGRESS_TIME, START_PROGRESS, END_PROGRESS} from './types';
import {ADD_ACTIVITY} from './types';

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
    type: END_PROGRESS
  }
}

export function addActivity(activity) {
  return {
    type: ADD_ACTIVITY,
    payload: activity
  }
}