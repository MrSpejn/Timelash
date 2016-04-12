import { combineReducers } from 'redux';
import progressReducer from './progress';
import historyReducer from './history';

const rootReducer = combineReducers({
  history: historyReducer,
  progress: progressReducer,
});

export default rootReducer;
