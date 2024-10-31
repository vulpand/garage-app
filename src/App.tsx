import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider } from './context/AuthenticationContext';
import Layout from './components/dashboard/Layout';
import { ToastProvider } from './components/context/ToastContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <ToastProvider>
          <Layout />
        </ToastProvider>
      </AuthenticationProvider>
    </Router>
  );
};

export default App;
