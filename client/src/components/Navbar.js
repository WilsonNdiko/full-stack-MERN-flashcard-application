// client/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthState';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const onLogout = () => {
    // Call the global logout function to clear the token
    logout();
  };

  // Links to show when the user is authenticated (logged in)
  const authLinks = (
    <>
      <li>
        <span className='text-light'>Hello User!</span> {/* We'll get the name later */}
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  );

  // Links to show when the user is NOT authenticated (logged out)
  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className='fas fa-grip-lines-vertical'></i> Flashcard App
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;