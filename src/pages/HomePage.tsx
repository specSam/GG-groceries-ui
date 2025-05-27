// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import DropDown from './components/DropDown';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('Welcome');
  
  // Get username from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { email: '' };
  var username = user.email.split('@')[0]; // Extract username from email
  var userIsLoggedIn = username != ''
  const [loggedIn, setLoggedIn] = useState<boolean>(userIsLoggedIn);
  const [dropDownOpen, setDropdownOpen] = useState<boolean>(false);
  
  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLogin = () => {
    navigate('login')
  }
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
  };

  const userButtons = [
    {
      label: "Profile",
      onClick: () => handleNavigation('Profile')
    },
    {
      label: "Settings",
      onClick: () => {},
    },
    {
      label: "Log out",
      onClick: () => handleLogout(),
    }
  ]
  
  return (
    <div className="home-container">
      {/* Header with navigation */}
      <header className="app-header">
        <div className="logo-container">
          <h1 className="app-title">GG Groceries</h1>
        </div>
        <nav className="main-nav">
          <search className="grocery-search">
            <input placeholder='Search for any grocery!'/>
            <button></button>
          </search>
        </nav>
        
          {!loggedIn ? (
            <button className="logging-button" onClick={handleLogin}>Login/Signup</button>
          ) : (
            <DropDown label={<button id='user-drop-down'>Welcome {username}</button>} trigger="Click" buttons={userButtons} ></DropDown>
          )} 
          
        
      </header>
      
      {/* Main content area */}
      <main className="main-content">
        {activeSection === 'Welcome' ? (
          <div className="welcome-section">
            <h2>Welcome to GG Groceries</h2>
            <p>Find the best prices for groceries at nearby stores</p>
            <p>Select an option from the navigation bar to get started</p>
          </div>
        ) : (
          <div className="section-content">
            <h2>{activeSection}</h2>
            <p>You selected: {activeSection}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;