/* eslint-disable no-unused-vars */
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectCurrentAccLock,
  selectCurrentToken,
} from '../features/auth/authSlice';

const AdminProtectedRoutes = () => {
  const location = useLocation();
  const accessToken = useSelector(selectCurrentToken);
  const accountLock = useSelector(selectCurrentAccLock);

  if (accessToken && !accountLock) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
};

export default AdminProtectedRoutes;
