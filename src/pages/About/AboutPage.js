import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About This Project</h1>
      
      <section className="about-section">
        <h2>Project Overview</h2>
        <p>
          This is a simple single-page application (SPA) built with React. It was created as a demonstration
          project to showcase React development practices, including component structure, state management,
          routing, and styling.
        </p>
      </section>
      
      <section className="about-section">
        <h2>Tech Stack</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <h3>React</h3>
            <p>A JavaScript library for building user interfaces</p>
          </div>
          <div className="tech-item">
            <h3>React Router</h3>
            <p>A standard library for routing in React</p>
          </div>
          <div className="tech-item">
            <h3>React Hooks</h3>
            <p>For state management and side effects</p>
          </div>
          <div className="tech-item">
            <h3>CSS Modules</h3>
            <p>For component-scoped CSS</p>
          </div>
        </div>
      </section>
      
      <section className="about-section">
        <h2>Features</h2>
        <ul className="feature-list">
          <li>Single-page application architecture</li>
          <li>Todo list functionality (add, edit, delete, mark as completed)</li>
          <li>Persistent storage using localStorage</li>
          <li>Responsive design for all screen sizes</li>
          <li>Clean and modern UI</li>
        </ul>
      </section>
      
      <section className="about-section">
        <h2>Learning Resources</h2>
        <div className="resource-links">
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="resource-link">
            React Documentation
          </a>
          <a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer" className="resource-link">
            React Router Documentation
          </a>
          <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="resource-link">
            MDN Web Docs
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 