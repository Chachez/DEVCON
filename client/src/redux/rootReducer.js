import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';
import navReducer from './reducers/navReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
});

export default rootReducer;
