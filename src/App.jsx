import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkPage from './LinkPage';

const App = () => {
  return (
    <Router>
      
        <LinkPage />
    </Router>
    
  );
};

export default App;
