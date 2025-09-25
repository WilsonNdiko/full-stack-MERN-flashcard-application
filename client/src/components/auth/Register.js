// client/src/components/auth/Register.js

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/AuthState';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Use the AuthContext to get the register function and login state
  const { register, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if authenticated (already logged in)
  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the Dashboard after successful login/registration
      navigate('/dashboard');
    }
    // Dependency array ensures this runs only when isAuthenticated changes
  }, [isAuthenticated, navigate]);

  // Local state for the form data
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '', // For password confirmation
  });

  const { name, email, password, password2 } = user;

  // Handle form field changes
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('Passwords do not match'); // Basic error handling
    } else {
      // Call the global register function with the user data
      register({
        name,
        email,
        password,
      });
      // Clear form (optional)
      setUser({ name: '', email: '', password: '', password2: '' });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
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
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;