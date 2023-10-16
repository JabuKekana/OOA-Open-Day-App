import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';

const AdminRoute = ({ element }) => {
  const { currentUser } = useAuth();


  if (currentUser && currentUser.isAdmin) {
    return element;
  }

  return <Navigate to="/signup" />;
};

export default AdminRoute;
