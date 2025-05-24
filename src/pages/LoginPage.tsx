import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

// Define TypeScript interfaces for our component props and form data
interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // This is a placeholder for your actual authentication logic
      // In a real app, you would call your authentication API here
      console.log(`${isLoggingIn ? 'Logging in' : 'Signing up'} with`, formData);
      
      // Simulate successful login (replace with actual auth logic)
      localStorage.setItem('user', JSON.stringify({ email: formData.email }));
      
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
    }
  };

  const toggleAuthMode = () => {
    setIsLoggingIn(!isLoggingIn);
    setError(null);
  };

  return (
    <div className="login-container">
      <header className="app-header">
        <h1 className="app-title">GG Groceries</h1>
      </header>
      
      <div className="login-form-wrapper">
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {isLoggingIn ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <p className="auth-switch">
          {isLoggingIn 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <button 
            onClick={toggleAuthMode}
            className="text-btn"
          >
            {isLoggingIn ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;