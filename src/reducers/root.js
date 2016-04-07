import { combineReducers } from 'redux';
import progressReducer from './progress';
import activityReducer from './activity';

const rootReducer = combineReducers({
  activities: activityReducer,
  progress: progressReducer,
});

export default rootReducer;
