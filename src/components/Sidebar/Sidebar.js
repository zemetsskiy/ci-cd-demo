import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toggleSidebar } from '../../store/slices/uiSlice';

// Icons
import { 
  FiHome, 
  FiList, 
  FiBarChart2, 
  FiSettings, 
  FiX 
} from 'react-icons/fi';

const SidebarContainer = styled(motion.aside)`
  position: sticky;
  top: 0;
  height: 100vh;
  background-color: ${props => props.theme.surface};
  box-shadow: 2px 0 5px ${props => props.theme.shadow};
  z-index: 100;
  overflow-x: hidden;
  transition: width 0.3s ease;
  width: ${props => props.isOpen ? '250px' : '0'};
  
  @media (max-width: 768px) {
    position: fixed;
    width: ${props => props.isOpen ? '100%' : '0'};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const Logo = styled.h1`
  color: ${props => props.theme.primary};
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.text};
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const NavMenu = styled.nav`
  padding: 1rem 0;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.theme.textLight};
  transition: all 0.2s ease;
  text-decoration: none;
  
  &:hover {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.primary};
    text-decoration: none;
  }
  
  &.active {
    color: ${props => props.theme.primary};
    background-color: ${props => `${props.theme.primary}10`};
    border-left: 3px solid ${props => props.theme.primary};
  }
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  
  const closeSidebar = () => {
    dispatch(toggleSidebar());
  };
  
  const sidebarVariants = {
    open: { 
      width: '250px',
      transition: { duration: 0.3 }
    },
    closed: { 
      width: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <SidebarContainer 
      isOpen={isOpen}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      <SidebarHeader>
        <Logo>TaskMaster</Logo>
        <CloseButton onClick={closeSidebar}>
          <FiX />
        </CloseButton>
      </SidebarHeader>
      
      <NavMenu>
        <NavItem to="/dashboard" onClick={closeSidebar}>
          <FiHome /> Dashboard
        </NavItem>
        <NavItem to="/tasks" onClick={closeSidebar}>
          <FiList /> Tasks
        </NavItem>
        <NavItem to="/statistics" onClick={closeSidebar}>
          <FiBarChart2 /> Statistics
        </NavItem>
        <NavItem to="/settings" onClick={closeSidebar}>
          <FiSettings /> Settings
        </NavItem>
      </NavMenu>
    </SidebarContainer>
  );
};

export default Sidebar; 