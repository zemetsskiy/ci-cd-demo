import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiEdit, FiTrash2, FiFlag, FiClock, FiTag } from 'react-icons/fi';
import { toggleTask, deleteTask } from '../../store/slices/tasksSlice';
import { addNotification } from '../../store/slices/uiSlice';

const Card = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  padding: 1rem;
  position: relative;
  border-left: 4px solid ${props => {
    if (props.completed) return props.theme.success;
    switch (props.priority) {
      case 'high': return props.theme.error;
      case 'medium': return props.theme.warning;
      default: return props.theme.info;
    }
  }};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 8px ${props => props.theme.shadow};
    transform: translateY(-2px);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const TaskTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? props.theme.textLight : props.theme.text};
`;

const Checkbox = styled.button`
  background-color: ${props => props.checked ? props.theme.primary : 'transparent'};
  border: 2px solid ${props => props.checked ? props.theme.primary : props.theme.border};
  color: white;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;

const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
  margin-left: 2.25rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: ${props => props.theme.textLight};
  
  svg {
    margin-right: 0.25rem;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  
  &:hover {
    color: ${props => {
      switch (props.type) {
        case 'edit': return props.theme.primary;
        case 'delete': return props.theme.error;
        default: return props.theme.text;
      }
    }};
    background-color: ${props => props.theme.background};
  }
`;

const TaskCard = ({ task, showActions = true, showDueDate = false }) => {
  const dispatch = useDispatch();
  
  const handleToggle = () => {
    dispatch(toggleTask(task.id))
      .unwrap()
      .then(() => {
        dispatch(addNotification({
          type: 'success',
          message: `Task marked as ${task.completed ? 'incomplete' : 'complete'}`
        }));
      });
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id))
      .unwrap()
      .then(() => {
        dispatch(addNotification({
          type: 'success',
          message: 'Task deleted successfully'
        }));
      });
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Normal';
    }
  };
  
  return (
    <Card
      completed={task.completed}
      priority={task.priority}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <TaskHeader>
        <Checkbox 
          checked={task.completed} 
          onClick={handleToggle}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed && <FiCheck size={12} />}
        </Checkbox>
        <TaskTitle completed={task.completed}>
          {task.title}
        </TaskTitle>
      </TaskHeader>
      
      <TaskMeta>
        {task.priority && (
          <MetaItem>
            <FiFlag size={12} />
            {getPriorityLabel(task.priority)}
          </MetaItem>
        )}
        
        {task.category && (
          <MetaItem>
            <FiTag size={12} />
            {task.category}
          </MetaItem>
        )}
        
        {(task.dueDate && showDueDate) && (
          <MetaItem>
            <FiClock size={12} />
            {formatDate(task.dueDate)}
          </MetaItem>
        )}
      </TaskMeta>
      
      {showActions && (
        <ActionBar>
          <Link to={`/tasks/${task.id}`}>
            <ActionButton type="edit">
              <FiEdit size={16} />
            </ActionButton>
          </Link>
          <ActionButton type="delete" onClick={handleDelete}>
            <FiTrash2 size={16} />
          </ActionButton>
        </ActionBar>
      )}
    </Card>
  );
};

export default TaskCard; 