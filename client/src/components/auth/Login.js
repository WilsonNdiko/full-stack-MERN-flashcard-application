// client/src/components/auth/Login.js

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Use the AuthContext to get the login function and state
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Local state for the form data
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  // Handle form field changes
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Call the global login function
    login({
      email,
      password,
    });
    // Form will clear on successful login when state updates and navigates
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;