import { createGlobalStyle } from 'styled-components';

// Light theme colors
export const lightTheme = {
  primary: '#0070f3',
  secondary: '#6c757d',
  background: '#f8f9fa',
  surface: '#ffffff',
  text: '#212529',
  textLight: '#6c757d',
  border: '#dee2e6',
  error: '#dc3545',
  success: '#28a745',
  warning: '#ffc107',
  info: '#17a2b8',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Dark theme colors
export const darkTheme = {
  primary: '#3f8cff',
  secondary: '#8c98a4',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#e1e1e1',
  textLight: '#b0b0b0',
  border: '#333333',
  error: '#f55a5a',
  success: '#4cc85a',
  warning: '#ffb938',
  info: '#5ac8f5',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

// Global styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all 0.3s ease;
  }
  
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    font-family: inherit;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${props => props.theme.text};
  }
  
  input, select, textarea {
    font-family: inherit;
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.surface};
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    padding: 0.5rem;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
    }
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.textLight};
  }
`; 