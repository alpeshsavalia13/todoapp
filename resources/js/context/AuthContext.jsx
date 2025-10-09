import React, { createContext, useContext, useState, useEffect } from 'react';
import API, { getCsrfCookie } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const { data } = await API.get('/api/user');
      console.log(data);
      if (data && data.id > 0) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    await getCsrfCookie();
    await API.post('/api/login', credentials, { withCredentials: true });
    await fetchUser();
  };

  const register = async (details) => {
    await getCsrfCookie();
    await API.post('/api/register', details);
    await fetchUser();
  };

  const logout = async () => {
    await API.post('/api/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
