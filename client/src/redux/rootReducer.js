import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';

const rootReducer = () => {
  return combineReducers({
    auth: authReducer,
  });
};

const defaultState = (state, action) => {
  action.type === 'LOGOUT'
    ? rootReducer(undefined, action)
    : rootReducer(state, action);
};

export default defaultState;
