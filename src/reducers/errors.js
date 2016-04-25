import {RAISE_AUTH_ERROR, SIGN_IN} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case RAISE_AUTH_ERROR:
      return {...state, auth: action.payload};
    case SIGN_IN:
      return {...state, auth: false};
    default:
      return state;
  }
}