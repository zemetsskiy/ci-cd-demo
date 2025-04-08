import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiFilter, FiCheck, FiX, FiCircle } from 'react-icons/fi';
import { selectFilteredTasks, setFilter, addTask } from '../../store/slices/tasksSlice';
import { addNotification } from '../../store/slices/uiSlice';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const Container = styled.div`
  max-width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

const FilterBar = styled.div`
  display: flex;
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  padding: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const FilterLabel = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-right: 1rem;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  background-color: ${props => 
    props.active ? 
    `${props.theme.primary}20` : 
    'transparent'
  };
  color: ${props => 
    props.active ? 
    props.theme.primary : 
    props.theme.textLight
  };
  border: 1px solid ${props => 
    props.active ? 
    props.theme.primary : 
    props.theme.border
  };
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

const TasksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: ${props => props.theme.textLight};
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const FormContainer = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const activeFilter = useSelector(state => state.tasks.filter);
  const [showForm, setShowForm] = useState(false);

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

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const taskListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <Container>
      <Header>
        <Title>Tasks</Title>
        <AddButton onClick={() => setShowForm(!showForm)}>
          <FiPlus /> Add Task
        </AddButton>
      </Header>

      <AnimatePresence>
        {showForm && (
          <FormContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
          </FormContainer>
        )}
      </AnimatePresence>

      <FilterBar>
        <FilterLabel>
          <FiFilter /> Filter:
        </FilterLabel>
        <FilterOptions>
          <FilterButton
            active={activeFilter === 'all'}
            onClick={() => handleFilterChange('all')}
          >
            All
          </FilterButton>
          <FilterButton
            active={activeFilter === 'active'}
            onClick={() => handleFilterChange('active')}
          >
            <FiCircle size={12} /> Active
          </FilterButton>
          <FilterButton
            active={activeFilter === 'completed'}
            onClick={() => handleFilterChange('completed')}
          >
            <FiCheck size={12} /> Completed
          </FilterButton>
        </FilterOptions>
      </FilterBar>

      {tasks.length > 0 ? (
        <motion.div
          variants={taskListVariants}
          initial="hidden"
          animate="visible"
        >
          <TasksGrid>
            <AnimatePresence>
              {tasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  showDueDate={true}
                />
              ))}
            </AnimatePresence>
          </TasksGrid>
        </motion.div>
      ) : (
        <EmptyState>
          <FiX size={48} />
          <h3>No tasks found</h3>
          <p>
            {activeFilter !== 'all' 
              ? `There are no ${activeFilter} tasks.` 
              : 'Start by adding a new task.'}
          </p>
        </EmptyState>
      )}
    </Container>
  );
};

export default TaskList; 