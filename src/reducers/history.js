import {FETCH_HISTORY, ADD_TO_HISTORY} from '../actions/types';

export default function activitesReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_HISTORY:
      return [...state, action.payload];

    case FETCH_HISTORY:
      if (action.payload) {
        return [...action.payload];
      }
      return state;

    default:
      return state;
  }
}