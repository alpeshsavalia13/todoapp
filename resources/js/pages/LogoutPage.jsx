// pages/LogoutPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();         // clear user
    navigate('/login'); // redirect to login page
  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default LogoutPage;
