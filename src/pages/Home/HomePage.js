import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to React SPA</h1>
        <p>A simple single-page application built with React</p>
        <div className="hero-actions">
          <Link to="/todos" className="btn btn-hero">
            Try Todo App
          </Link>
          <Link to="/about" className="btn btn-secondary btn-hero">
            Learn More
          </Link>
        </div>
      </section>
      
      <section className="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Fast & Responsive</h3>
            <p>Built with React for optimal performance and responsiveness.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>State Management</h3>
            <p>Efficient state management with React hooks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Modern Design</h3>
            <p>Clean and intuitive user interface with modern design principles.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile-First</h3>
            <p>Fully responsive design that works on all devices.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 