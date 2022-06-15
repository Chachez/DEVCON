import { authentication } from '../constants/authActionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case authentication.LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        token: payload.data.token,
        isAuthenticated: true,
        loading: false,
      };
    case authentication.LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
};

export default authReducer;
