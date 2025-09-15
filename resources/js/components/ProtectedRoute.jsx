import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // defensive logging
  console.log("ProtectedRoute user:", user);

  if (user === null) {
    return <p>Loading...</p>;   // ✅ prevents Promise/null rendering
  }
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
