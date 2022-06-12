import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { LinearProgress } from '@mui/material';

import Login from './views/authentication/components/Login';
import PrivateRoutes from './services/authGuard/PrivateRoutes';

const Dashboard = lazy(() => import('./views/Dashboard/components/Dashboard'));

const App = () => {
  const reduxState = useSelector((state) => state, shallowEqual);
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxState.auth) {
      navigate('/');
    }
  }, [reduxState.auth, navigate]);
  return (
    <div>
      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' exact element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
