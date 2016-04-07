import {CHANGE_ACTIVITY_TIME, START_ACTIVITY} from './types';

export function changeActivityTime(time) {
  return {
    type: CHANGE_ACTIVITY_TIME,
    payload: time
  };
}

export function startActivity(activity) {
  return {
    type: START_ACTIVITY,
    payload: activity
  }
}