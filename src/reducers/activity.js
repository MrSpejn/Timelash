import {END_ACTIVITY, CHANGE_ACTIVITY_TIME} from '../actions/types';

export default function activityReducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_ACTIVITY_TIME:
      return {
         ...state,
         time: action.payload
      };
    default:
      return state;
  }
}