import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './styles/App.css';
import HomePage from './pages/HomePage';



const Home: React.FC = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { email: '' };
  var username = user.email.split('@')[0]; // Extract username from email
 return <HomePage username={username}></HomePage>
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <Home />
          } 
        />
        {/* Add more routes here as we build them */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;