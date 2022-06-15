import axios from 'axios';
import store from '../../redux/store';
import { authentication } from '../../redux/constants/authActionTypes';

// Create an instance of axios
const { REACT_APP_URL } = process.env;
const api = axios.create({
  baseURL: REACT_APP_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: authentication.LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
