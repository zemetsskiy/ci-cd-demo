import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toggleTheme } from '../../store/slices/uiSlice';
import { FiSun, FiMoon } from 'react-icons/fi';

const ToggleContainer = styled.button`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  overflow: hidden;
  width: 60px;
  height: 30px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const SunIcon = styled(FiSun)`
  color: ${props => props.theme.warning};
  transition: all 0.3s linear;
  margin-left: 3px;
`;

const MoonIcon = styled(FiMoon)`
  color: ${props => props.theme.textLight};
  transition: all 0.3s linear;
  margin-right: 3px;
`;

const ToggleCircle = styled(motion.div)`
  background: ${props => props.theme.primary};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 24px;
  width: 24px;
`;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <ToggleContainer onClick={handleToggle}>
      <Icons>
        <SunIcon />
        <MoonIcon />
      </Icons>
      <ToggleCircle
        initial={false}
        animate={{ x: theme === 'dark' ? 30 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </ToggleContainer>
  );
};

export default ThemeToggle;