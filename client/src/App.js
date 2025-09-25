// client/src/App.js (Final Routes Update)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthState';

// Components
import Navbar from './components/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import CardView from './components/CardView'; // <-- NEW COMPONENT
import Study from './components/Study'; // <-- NEW COMPONENT

// Placeholder Home Component
const Home = () => <h1>Welcome to Flashcard App!</h1>;

const App = () => {
  return (
    <AuthProvider>
      <Navbar /> 
      <div className="container">
        <Routes>
          {/* Static routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Dynamic route: view cards for a specific deck */}
          <Route path="/deck/:deckId" element={<CardView />} />
          <Route path="/study/:deckId" element={<Study />} />  
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
