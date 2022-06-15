import api from '../../services/authGuard/api';

import { authentication } from '../constants/authActionTypes';

export const login = (data) => async (dispatch) => {
  try {
    const res = await api.post('/auth', data);
    dispatch({ type: authentication.LOGIN_SUCCESS, payload: res });
    return res;
  } catch (err) {
    Promise.reject(err?.response);
    return err;
  }
};

export const getUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    dispatch({ type: authentication.LOAD_USER, payload: res.data });
    return res;
  } catch (err) {
    Promise.reject(err?.response);
    return err;
  }
};

export const logout = () => ({ type: authentication.LOGOUT });
