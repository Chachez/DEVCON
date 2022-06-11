import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './views/authentication/components/Login';
import PrivateRoutes from './services/authGuard/PrivateRoutes';

const Dashboard = lazy(() => import('./views/Dashboard/components/Dashboard'));

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' exact element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
