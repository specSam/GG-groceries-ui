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
  const [addProductMode, setAddProductMode] = useState<string | null>(null);
  
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

  const addProductButtons = [
    {
      label: "Manual",
      onClick: () => {
        setActiveSection('Add Product');
        setAddProductMode('Manual');
      }
    },
    {
      label: "Scan bar code",
      onClick: () => {
        setActiveSection('Add Product');
        setAddProductMode('Scan bar code');
      }
    },
    {
      label: "Scan product",
      onClick: () => {
        setActiveSection('Add Product');
        setAddProductMode('Scan product');
      }
    }
  ]

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setAddProductMode(null);
  }
  
  return (
    <div className="home-container">
      {/* Header search bar and user drop down/login/signin button depending on if user is logged in*/}
      <header className="app-header">
        <div className="logo-container">
          <h1 className="app-title" onClick={() => handleNavigation('Welcome')}>GG Groceries</h1>
        </div>
        <nav className="main-nav">
          <div className="nav-buttons">
            <button 
              className={`nav-button ${activeSection === 'Search' ? 'active' : ''}`}
              onClick={() => handleNavigation('Search')}
            >
              Search
            </button>
            <button 
              className={`nav-button ${activeSection === 'Recipes' ? 'active' : ''}`}
              onClick={() => handleNavigation('Recipes')}
            >
              Recipes
            </button>
            <button 
              className={`nav-button ${activeSection === 'Favorite Stores' ? 'active' : ''}`}
              onClick={() => handleNavigation('Favorite Stores')}
            >
              Favorite Stores
            </button>
            <button 
              className={`nav-button ${activeSection === 'Favorite Products' ? 'active' : ''}`}
              onClick={() => handleNavigation('Favorite Products')}
            >
              Favorite Products
            </button>
            <DropDown 
              label={<button className={`nav-button dropdown-trigger ${activeSection === 'Add Product' ? 'active' : ''}`}>Add Product</button>} 
              buttons={addProductButtons} 
            />
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
        {activeSection === 'Welcome' && (
          <div className="welcome-section">
            <h2>Welcome to GG Groceries</h2>
            <p>Find the best prices for groceries at nearby stores</p>
            <p>Select an option from the navigation bar to get started</p>
          </div>
        )}

        {activeSection === 'Search' && (
          <div className="search-section">
            <h2>Search Groceries</h2>
            {/* TODO: replace with own component */}
            <div className="search-form">
              <input type="text" placeholder="Search for any grocery item..." className="search-input" />
              <button className="search-btn">Search</button>
            </div>
            <div className="search-results">
              <h3>Recent Searches</h3>
              <ul>
                <li>Milk - Whole, 1 Gallon</li>
                <li>Bread - White, Sliced</li>
                <li>Eggs - Large, Dozen</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 'Recipes' && (
          <div className="recipes-section">
            <h2>Your Recipes</h2>
            {/* TODO: replace with own component */}
            <div className="recipe-grid">
              <div className="recipe-card">
                <h3>Spaghetti Carbonara</h3>
                <p>Classic Italian pasta dish</p>
                <span>Prep time: 20 min</span>
              </div>
              <div className="recipe-card">
                <h3>Chicken Stir Fry</h3>
                <p>Quick and healthy dinner</p>
                <span>Prep time: 15 min</span>
              </div>
              <div className="recipe-card">
                <h3>Chocolate Chip Cookies</h3>
                <p>Homemade sweet treats</p>
                <span>Prep time: 30 min</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Favorite Stores' && (
          <div className="stores-section">
            <h2>Your Favorite Stores</h2>
            {/* TODO: replace with own component */}
            <div className="store-list">
              <div className="store-item">
                <h3>Whole Foods Market</h3>
                <p>123 Main St, Your City</p>
                <span>★★★★★ 4.8/5</span>
              </div>
              <div className="store-item">
                <h3>Trader Joe's</h3>
                <p>456 Oak Ave, Your City</p>
                <span>★★★★☆ 4.5/5</span>
              </div>
              <div className="store-item">
                <h3>Safeway</h3>
                <p>789 Pine Rd, Your City</p>
                <span>★★★★☆ 4.2/5</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Favorite Products' && (
          <div className="products-section">
            <h2>Your Favorite Products</h2>
            {/* TODO: replace with own component */}
            <div className="product-list">
              <div className="product-item">
                <h3>Organic Milk - 1 Gallon</h3>
                <p>Best price: $4.99 at Whole Foods</p>
                <span>Last updated: 2 hours ago</span>
              </div>
              <div className="product-item">
                <h3>Sourdough Bread</h3>
                <p>Best price: $3.49 at Trader Joe's</p>
                <span>Last updated: 1 day ago</span>
              </div>
              <div className="product-item">
                <h3>Free Range Eggs - Dozen</h3>
                <p>Best price: $5.29 at Safeway</p>
                <span>Last updated: 3 hours ago</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Add Product' && addProductMode === 'Manual' && (
          <div className="add-product-section">
            <h2>Add Product Manually</h2>
            {/* TODO: replace with own component */}
            <form className="manual-form">
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" placeholder="Enter product name" />
              </div>
              <div className="form-group">
                <label>Brand</label>
                <input type="text" placeholder="Enter brand name" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option>Select category</option>
                  <option>Dairy</option>
                  <option>Meat</option>
                  <option>Produce</option>
                  <option>Bakery</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="form-group">
                <label>Store</label>
                <input type="text" placeholder="Store name" />
              </div>
              <button type="submit" className="submit-btn">Add Product</button>
            </form>
          </div>
        )}

        {activeSection === 'Add Product' && addProductMode === 'Scan bar code' && (
          <div className="add-product-section">
            <h2>Scan Barcode</h2>
            {/* TODO: replace with own component */}
            <div className="scan-interface">
              <div className="camera-placeholder">
                <p>📷 Camera viewfinder would appear here</p>
                <p>Position the barcode within the frame</p>
              </div>
              <div className="scan-controls">
                <button className="scan-btn">Start Scanning</button>
                <input type="text" placeholder="Or enter barcode manually" />
                <button className="lookup-btn">Look Up</button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'Add Product' && addProductMode === 'Scan product' && (
          <div className="add-product-section">
            <h2>Scan Product</h2>
            {/* TODO: replace with own component */}
            <div className="scan-interface">
              <div className="camera-placeholder">
                <p>📸 Camera viewfinder would appear here</p>
                <p>Take a photo of the product for identification</p>
              </div>
              <div className="scan-controls">
                <button className="photo-btn">Take Photo</button>
                <div className="upload-area">
                  <p>Or drag and drop an image here</p>
                  <input type="file" accept="image/*" />
                </div>
              </div>
            </div>
          </div>
        )}

        {(activeSection === 'Profile' || activeSection === 'Settings') && (
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