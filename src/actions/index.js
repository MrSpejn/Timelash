import {CHANGE_ACTIVITY_TIME} from './types';

export function changeActivityTime(time) {
  return {
    type: CHANGE_ACTIVITY_TIME,
    payload: time
  };
}