import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinkPage from './LinkPage';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      
        <LinkPage />
      <Toaster />
    </Router>
    
  );
};

export default App;
