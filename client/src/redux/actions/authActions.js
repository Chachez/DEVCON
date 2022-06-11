import axios from 'axios';

import { authentication } from '../helpers/authActionTypes';
import { baseUrl } from '../../services/baseUrl';

export const login = (data) => async (dispatch) => {
  return await axios
    .post(baseUrl + 'auth', data)
    .then((res) => {
      dispatch({ type: authentication.LOGIN_SUCCESS, payload: res.data });
      return res;
    })
    .catch(async (err) => {
      Promise.reject(err?.response);
      return err;
    });
};
