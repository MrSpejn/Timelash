import {END_PROGRESS, CHANGE_PROGRESS_TIME, START_PROGRESS, FETCH_UNFINISHED_PROGRESS} from '../actions/types';
import moment from 'moment';

export default function progressReducer(state = null, action) {
  switch (action.type) {
    case START_PROGRESS:
      return {
        time: 0,
        date: moment(),
        ...action.payload
      }

    case CHANGE_PROGRESS_TIME:
      return {
         ...state,
         time: action.payload
      };

    case END_PROGRESS: {
      return action.payload;
    }

    case FETCH_UNFINISHED_PROGRESS: {
      return action.payload;
    }
    default:
      return state;
  }
}