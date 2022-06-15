import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@mui/material';

import Login from './views/authentication/components/Login';
import PrivateRoutes from './services/authGuard/PrivateRoutes';
import { TopBar } from './Layouts/components';
import setAuthToken from './services/authGuard/authToken';
import { authentication } from './redux/constants/authActionTypes';
import { getUser } from './redux/actions/authActions';

const Dashboard = lazy(() => import('./views/Dashboard/components/Dashboard'));
const Profile = lazy(() => import('./views/Profile/Profile'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    dispatch(getUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch({ type: authentication.LOGOUT });
    });
  }, [dispatch]);

  return (
    <div>
      <TopBar />
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' exact element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
