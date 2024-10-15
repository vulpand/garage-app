import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthenticationProvider } from './context/AuthenticationContext';
import Layout from './components/dashboard/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <Layout />
      </AuthenticationProvider>
    </Router>
  );
};

export default App;
