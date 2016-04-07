import { combineReducers } from 'redux';
import activityReducer from './activity';

const rootReducer = combineReducers({
  activity: activityReducer,
});

export default rootReducer;
