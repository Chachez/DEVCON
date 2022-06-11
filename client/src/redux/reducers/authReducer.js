import { authentication } from '../helpers/authActionTypes';

const initialState = { isAuthenticated: false, accessToken: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authentication.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
