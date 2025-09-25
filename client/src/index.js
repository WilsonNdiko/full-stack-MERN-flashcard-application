// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // We'll keep the basic CSS file
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap the App component with BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// We removed the reportWebVitals import and call here.