// client/src/context/auth/AuthState.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
export const AuthContext = createContext();

// Set the API base URL
const API_URL = 'http://localhost:5000/api/auth';

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Set the global token in Axios headers whenever the token state changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      setIsAuthenticated(true);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [token]);

  // Register User
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/register`, formData);
      // The API returns { token: '...' }
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      // Success! User is now logged in.
    } catch (err) {
      // Log the error message from the server
      console.error(err.response.data.msg);
      // Clear token on failure
      setToken(null);
      localStorage.removeItem('token');
      // In a real app, you would set an error state here
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/login`, formData);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error(err.response.data.msg);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  // Logout User
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // The value exposed to the rest of the application
  const authContextValue = {
    token,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};