import {ADD_ACTIVITY} from '../actions/types';

export default function activitesReducer(state = [], action) {
  switch (action.type) {
    case ADD_ACTIVITY:
      console.log("REDUCER", [...state, action.payload]);
      return [...state, action.payload];

    default:
      return state;
  }
}