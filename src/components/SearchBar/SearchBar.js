import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.background};
  border-radius: 50px;
  padding: 0.5rem 1rem;
  flex: 0 1 400px;
  max-width: 400px;
  position: relative;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.2s ease;
  
  &:focus-within {
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
    border-color: ${props => props.theme.primary};
  }
  
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: ${props => props.theme.text};
  font-size: 0.9rem;
  outline: none;
  padding: 0.25rem 0.5rem;
  width: 100%;
  
  &::placeholder {
    color: ${props => props.theme.textLight};
  }
`;

const SearchIcon = styled.div`
  color: ${props => props.theme.textLight};
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.textLight};
  display: flex;
  align-items: center;
  padding: 0;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };
  
  return (
    <SearchContainer>
      <SearchIcon>
        <FiSearch />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search tasks"
      />
      {searchTerm && (
        <ClearButton onClick={clearSearch} aria-label="Clear search">
          <FiX />
        </ClearButton>
      )}
    </SearchContainer>
  );
};

export default SearchBar; 