import {END_PROGRESS, CHANGE_PROGRESS_TIME, START_PROGRESS} from '../actions/types';

export default function progressReducer(state = null, action) {
  switch (action.type) {
    case START_PROGRESS:
      return {
        time: 0,
        ...action.payload
      }

    case CHANGE_PROGRESS_TIME:
      return {
         ...state,
         time: action.payload
      };

    case END_PROGRESS: {
        return null;
    }
    default:
      return state;
  }
}