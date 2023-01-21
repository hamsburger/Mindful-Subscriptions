import { combineReducers } from 'redux';

// reducers
import app from 'reducers/app.reducer';
import auth from 'reducers/auth.reducer';
import subscriptions from 'reducers/subscriptions.reducer';
const reducers = combineReducers({
  app,
  auth
  // subscriptions
});

export default reducers;
