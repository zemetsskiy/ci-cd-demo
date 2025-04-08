import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleSidebar } from '../../store/slices/uiSlice';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import SearchBar from '../SearchBar/SearchBar';
import { setSearchTerm } from '../../store/slices/tasksSlice';
import { FiMenu, FiBell } from 'react-icons/fi';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.surface};
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  z-index: 10;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.text};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.theme.error};
  color: white;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Header = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.ui.notifications);
  
  const handleMenuClick = () => {
    dispatch(toggleSidebar());
  };
  
  const handleSearch = (searchTerm) => {
    dispatch(setSearchTerm(searchTerm));
  };
  
  return (
    <HeaderContainer>
      <LeftSection>
        <MenuButton onClick={handleMenuClick}>
          <FiMenu />
        </MenuButton>
        <PageTitle>Task Master</PageTitle>
      </LeftSection>
      
      <SearchBar onSearch={handleSearch} />
      
      <RightSection>
        <IconButton>
          <FiBell />
          {notifications.length > 0 && (
            <NotificationBadge>
              {notifications.length > 9 ? '9+' : notifications.length}
            </NotificationBadge>
          )}
        </IconButton>
        <ThemeToggle />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header; 