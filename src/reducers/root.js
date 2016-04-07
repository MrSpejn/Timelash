import { combineReducers } from 'redux';
import activityReducer from './activity';

const rootReducer = combineReducers({
  currentActivity: activityReducer,
});

export default rootReducer;
