import React, { useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthDialog from './AuthDialog';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authInitialized } = useAuth();
  const location = useLocation();
  const authDialogRef = useRef(null);
  
  if (!authInitialized) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;