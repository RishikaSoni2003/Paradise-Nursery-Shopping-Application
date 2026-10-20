import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <h1 className="landing-title">Welcome to Paradise Nursery</h1>
          <p className="landing-subtitle">Where Greenery Meets Comfort</p>
          <button className="get-started-btn" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <AboutUs />
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProductList(false)} />
      )}
    </div>
  );
}

export default App;
