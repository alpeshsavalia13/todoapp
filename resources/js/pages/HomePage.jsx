import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import API, { getCsrfCookie } from '../api';
import Badge from '../components/Badge';

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div className="mx-auto bg-white shadow-lg rounded-xl p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to My Tracker.</h2>
    </div>
  );
};

export default HomePage;
