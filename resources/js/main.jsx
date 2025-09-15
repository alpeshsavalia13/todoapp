import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import '../css/app.css';

import ErrorBoundary from './ErrorBoundary';

ReactDOM.createRoot(document.getElementById('app')).render(
  <ErrorBoundary>
    <AuthProvider>
        <Router>
        <App />
        </Router>
    </AuthProvider>
  </ErrorBoundary>
);