import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

const PrivateRoutes = () => {
  const auth = useSelector((auth) => auth.auth.isAuthenticated, shallowEqual);
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
