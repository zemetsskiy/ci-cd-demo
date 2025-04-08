import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiCalendar, FiClock } from 'react-icons/fi';
import { selectFilteredTasks, addTask } from '../../store/slices/tasksSlice';
import { addNotification } from '../../store/slices/uiSlice';
import TaskCard from '../tasks/TaskCard';
import TaskForm from '../tasks/TaskForm';
import { Card, TaskList } from './Dashboard.styles';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin: 0;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 500;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.primary}dd;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.primary};
  }
`;

const ViewAll = styled(Link)`
  font-size: 0.875rem;
  color: ${props => props.theme.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatCard = styled.div`
  background-color: ${props => props.color || props.theme.surface};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: ${props => props.theme.text};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.textLight};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.textLight};
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const [showForm, setShowForm] = useState(false);
  
  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const dueSoonTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return !task.completed && dayDiff >= 0 && dayDiff <= 3;
  });
  
  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData))
      .unwrap()
      .then(() => {
        dispatch(addNotification({
          type: 'success',
          message: 'Task added successfully'
        }));
        setShowForm(false);
      })
      .catch(error => {
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to add task'
        }));
      });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <div>
      <DashboardHeader>
        <Title>Dashboard</Title>
        <AddButton onClick={() => setShowForm(!showForm)}>
          <FiPlus /> Add Task
        </AddButton>
      </DashboardHeader>
      
      {showForm && (
        <Card
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
        </Card>
      )}
      
      <DashboardContainer>
        <MainSection>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card variants={itemVariants}>
              <CardHeader>
                <CardTitle>
                  <FiCalendar /> Due Soon
                </CardTitle>
                <ViewAll to="/tasks">View All</ViewAll>
              </CardHeader>
              
              {dueSoonTasks.length > 0 ? (
                <TaskList>
                  {dueSoonTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      showDueDate 
                    />
                  ))}
                </TaskList>
              ) : (
                <EmptyState>
                  <FiClock />
                  <p>No upcoming tasks due soon!</p>
                </EmptyState>
              )}
            </Card>
          </motion.div>
        </MainSection>
        
        <SideSection>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card variants={itemVariants}>
              <CardTitle>Task Summary</CardTitle>
              <StatsGrid>
                <StatCard>
                  <StatValue>{totalTasks}</StatValue>
                  <StatLabel>Total Tasks</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{completedTasks}</StatValue>
                  <StatLabel>Completed</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{highPriorityTasks}</StatValue>
                  <StatLabel>High Priority</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{dueSoonTasks.length}</StatValue>
                  <StatLabel>Due Soon</StatLabel>
                </StatCard>
              </StatsGrid>
            </Card>
          </motion.div>
        </SideSection>
      </DashboardContainer>
    </div>
  );
};

export default Dashboard; 