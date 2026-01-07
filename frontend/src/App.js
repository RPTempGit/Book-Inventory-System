import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResourceDashboard from './components/ResourceDashboard';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ResourceDashboard />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;