// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import DropDown from './components/DropDown';

interface HomePageProps  {
  username: string
}

const HomePage: React.FC<HomePageProps> = ({username}) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('Welcome');
  
  // const [loggedIn, setLoggedIn] = useState<boolean>(username != 'Guest');
  const loggedIn = username !== 'Guest'
  
  // const handleLogout = () => { TODO: add back when authentication is implemented
  //   setLoggedIn(false);
  // };

  const handleLogin = () => {
    navigate('/login')
  }

  const userButtons = [
    {
      label: "Profile",
      onClick: () => setActiveSection('Profile')
    },
    {
      label: "Settings",
      onClick: () => setActiveSection('Settings'),
    },
    // { TODO: add back when authentication is implemented
    //   label: "Log out",
    //   onClick: () => handleLogout(),
    // }
  ]
  
  return (
    <div className="home-container">
      {/* Header search bar and user drop down/login/signin button depending on if user is logged in*/}
      <header className="app-header">
        <div className="logo-container">
          <h1 className="app-title">GG Groceries</h1>
        </div>
        <nav className="main-nav">
          <div className="grocery-search">
            <input placeholder='Search for any grocery!'/>
            <button></button>
          </div>
        </nav>
        
          {!loggedIn ? (
            <button className="logging-button" onClick={handleLogin}>Login/Signup</button>
          ) : (
            <DropDown label={<button id='user-drop-down'>Welcome {username}</button>} buttons={userButtons} ></DropDown>
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