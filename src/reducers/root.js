import { combineReducers }        from 'redux';
import progressReducer            from './progress';
import historyReducer             from './history';
import {reducer as formReducer}   from 'redux-form';

const rootReducer = combineReducers({
  history: historyReducer,
  progress: progressReducer,
  form: formReducer
});

export default rootReducer;
