import {END_ACTIVITY, CHANGE_ACTIVITY_TIME, START_ACTIVITY} from '../actions/types';

export default function activityReducer(state = {}, action) {
  switch (action.type) {
    case START_ACTIVITY:
      return action.payload;

    case CHANGE_ACTIVITY_TIME:
      return {
         ...state,
         time: action.payload
      };

    case END_ACTIVITY: {
        return null;
    }
    default:
      return state;
  }
}