import { combineReducers }        from 'redux';
import {reducer as formReducer}   from 'redux-form';

import progressReducer            from './progress';
import historyReducer             from './history';
import authReducer                from './auth';
import errorReducer               from './errors';
import profileReducer             from './profile';

const rootReducer = combineReducers({
  history: historyReducer,
  progress: progressReducer,
  auth: authReducer,
  form: formReducer,
  errors: errorReducer,
  profile: profileReducer
});

export default rootReducer;
