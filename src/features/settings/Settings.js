import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiDownload, FiUpload, FiTrash2 } from 'react-icons/fi';
import { setTheme } from '../../store/slices/uiSlice';
import { addNotification } from '../../store/slices/uiSlice';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const SettingsCard = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const OptionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: ${props => 
    props.active ? 
    `${props.theme.primary}15` : 
    props.theme.background
  };
  border: 1px solid ${props => 
    props.active ? 
    props.theme.primary : 
    props.theme.border
  };
  border-radius: 6px;
  cursor: pointer;
  min-width: 140px;
  
  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;

const OptionIcon = styled.div`
  margin-right: 0.75rem;
  color: ${props => 
    props.active ? props.theme.primary : props.theme.textLight
  };
  display: flex;
  align-items: center;
`;

const OptionLabel = styled.div`
  color: ${props => 
    props.active ? props.theme.primary : props.theme.text
  };
  font-weight: ${props => props.active ? '500' : 'normal'};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => 
    props.variant === 'danger' ? 
    props.theme.error : 
    props.theme.surface
  };
  color: ${props => 
    props.variant === 'danger' ? 
    'white' : 
    props.theme.text
  };
  border: 1px solid ${props => 
    props.variant === 'danger' ? 
    props.theme.error : 
    props.theme.border
  };
  border-radius: 4px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: 500;
  
  svg {
    margin-right: 0.75rem;
  }
  
  &:hover {
    background-color: ${props => 
      props.variant === 'danger' ? 
      `${props.theme.error}dd` : 
      props.theme.background
    };
  }
`;

const DataSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const SettingDescription = styled.p`
  color: ${props => props.theme.textLight};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const Settings = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);
  
  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
  };
  
  const handleDataExport = () => {
    try {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "tasks-backup.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      
      dispatch(addNotification({
        type: 'success',
        message: 'Tasks exported successfully'
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: 'Failed to export tasks'
      }));
    }
  };
  
  const handleDataImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const tasks = JSON.parse(event.target.result);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            dispatch(addNotification({
              type: 'success',
              message: 'Tasks imported successfully. Please refresh the page.'
            }));
          } catch (error) {
            dispatch(addNotification({
              type: 'error',
              message: 'Invalid file format'
            }));
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };
  
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all tasks? This action cannot be undone.')) {
      try {
        localStorage.removeItem('tasks');
        
        dispatch(addNotification({
          type: 'success',
          message: 'All tasks have been reset. Please refresh the page.'
        }));
      } catch (error) {
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to reset tasks'
        }));
      }
    }
  };
  
  const settingsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };
  
  return (
    <Container>
      <Title>Settings</Title>
      
      <motion.div
        variants={settingsVariants}
        initial="hidden"
        animate="visible"
      >
        <SettingsCard variants={cardVariants}>
          <Section>
            <SectionTitle>Appearance</SectionTitle>
            <SettingDescription>
              Choose your preferred theme for the application.
            </SettingDescription>
            <OptionGroup>
              <ThemeOption 
                active={theme === 'light'} 
                onClick={() => handleThemeChange('light')}
              >
                <OptionIcon active={theme === 'light'}>
                  <FiSun size={18} />
                </OptionIcon>
                <OptionLabel active={theme === 'light'}>
                  Light Mode
                </OptionLabel>
              </ThemeOption>
              
              <ThemeOption 
                active={theme === 'dark'} 
                onClick={() => handleThemeChange('dark')}
              >
                <OptionIcon active={theme === 'dark'}>
                  <FiMoon size={18} />
                </OptionIcon>
                <OptionLabel active={theme === 'dark'}>
                  Dark Mode
                </OptionLabel>
              </ThemeOption>
            </OptionGroup>
          </Section>
          
          <Section>
            <SectionTitle>Data Management</SectionTitle>
            <SettingDescription>
              Import, export, or reset your task data.
            </SettingDescription>
            <DataSection>
              <ActionButton onClick={handleDataExport}>
                <FiDownload size={16} /> Export Tasks
              </ActionButton>
              
              <ActionButton onClick={handleDataImport}>
                <FiUpload size={16} /> Import Tasks
              </ActionButton>
              
              <ActionButton onClick={handleResetData} variant="danger">
                <FiTrash2 size={16} /> Reset All Tasks
              </ActionButton>
            </DataSection>
          </Section>
        </SettingsCard>
      </motion.div>
    </Container>
  );
};

export default Settings; 