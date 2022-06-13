import { authentication } from '../constants/authActionTypes';

let user = JSON.parse(localStorage.getItem('state'));
const initialState = user ? { isAuthenticated: true, user } : null;
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authentication.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
