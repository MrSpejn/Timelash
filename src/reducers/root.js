import { combineReducers }        from 'redux';
import progressReducer            from './progress';
import historyReducer             from './history';
import authReducer                from './auth';
import {reducer as formReducer}   from 'redux-form';

const rootReducer = combineReducers({
  history: historyReducer,
  progress: progressReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
