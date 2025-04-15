// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './styles/App.css';

// A placeholder Home component until we implement it
const Home: React.FC = () => (
  <div className="placeholder-page">
    <h1>Home Page</h1>
    <p>This is just a placeholder for now. We'll implement the actual home page later.</p>
    <button onClick={() => {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }}>
      Logout
    </button>
  </div>
);

// Protected route component to handle authentication
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        {/* Add more routes here as we build them */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;