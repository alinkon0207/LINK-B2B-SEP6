import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  selectCurrentAccLock,
  selectCurrentToken,
} from '../features/auth/authSlice';

const UserProtectedRoutes = () => {
  const location = useLocation();
  const accessToken = useSelector(selectCurrentToken);
  const accountLock = useSelector(selectCurrentAccLock);

  if (accessToken && !accountLock) return <Outlet />;
  else if (accessToken && accountLock)
    return (
      <Navigate to="/user/change-password" state={{ from: location }} replace />
    );
  else return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default UserProtectedRoutes;
