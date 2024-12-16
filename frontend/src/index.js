/**
 * 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css'; // Include global styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create root and render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance reporting
reportWebVitals();


