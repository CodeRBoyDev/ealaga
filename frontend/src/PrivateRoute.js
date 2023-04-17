import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser, getRole} from './components/login/helpers';

const PrivateRoute = ({ allowedRoles, children }) => {
    const userRole = getRole();
  
    if (!getUser()) {
      return <Navigate to="/login" />;
    }

    if (!userRole) {
        userRole = 'visitor';
      }
  
    if (!allowedRoles.includes(userRole)) {
      if (userRole === 'personnel') {
        return <Navigate to="/personnel/dashboard" />;
      } else if (userRole === 'client') {
        return <Navigate to="/client/dashboard" />;
      } else {
        return <Navigate to="/admin/dashboard" />;
      }
    }
  
    return children;
  };
  
  

export default PrivateRoute;