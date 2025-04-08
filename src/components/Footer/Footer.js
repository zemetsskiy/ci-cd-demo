import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="copyright">© {year} React SPA. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" className="footer-link">
            React
          </a>
          <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="footer-link">
            MDN
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 