import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useAuth from '../custom-hooks/useAuth';

const AdminRoute = ({ element }) => {
  const { currentUser } = useAuth();

  // Check if the user is authenticated and has the admin role
  if (currentUser && currentUser.isAdmin) {
    return element;
  }

  // Redirect to the home page if the user is not authenticated or is not an admin
  return <Navigate to="/signup" />;
};

export default AdminRoute;
