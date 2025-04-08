import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiFlag, FiTag, FiClock, FiEdit, FiTrash2 } from 'react-icons/fi';
import { selectTaskById, updateTask, deleteTask } from '../../store/slices/tasksSlice';
import { addNotification } from '../../store/slices/uiSlice';
import TaskForm from './TaskForm';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  cursor: pointer;
  padding: 0;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const TaskDetailCard = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  padding: 2rem;
  margin-bottom: 2rem;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const TaskTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${props => props.theme.text};
  word-break: break-word;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
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

const TaskMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MetaLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.textLight};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const MetaValue = styled.div`
  font-size: 1rem;
  color: ${props => props.theme.text};
  font-weight: 500;
`;

const CompletionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${props => 
    props.completed ? 
    `${props.theme.success}15` : 
    `${props.theme.warning}15`
  };
  border-radius: 4px;
  border-left: 4px solid ${props => 
    props.completed ? 
    props.theme.success : 
    props.theme.warning
  };
  font-weight: 500;
  color: ${props => 
    props.completed ? 
    props.theme.success : 
    props.theme.warning
  };
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
  
  h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const task = useSelector(state => selectTaskById(state, parseInt(taskId)));
  const [isEditing, setIsEditing] = useState(false);
  
  if (!task) {
    return (
      <Container>
        <BackLink onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back to tasks
        </BackLink>
        <EmptyState>
          <h3>Task not found</h3>
          <p>The task you're looking for doesn't exist or has been deleted.</p>
        </EmptyState>
      </Container>
    );
  }
  
  const handleUpdate = (updatedTask) => {
    const { id, ...updatedFields } = updatedTask;
    
    dispatch(updateTask({ id, updatedFields }))
      .unwrap()
      .then(() => {
        dispatch(addNotification({
          type: 'success',
          message: 'Task updated successfully'
        }));
        setIsEditing(false);
      })
      .catch(error => {
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to update task'
        }));
      });
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id))
        .unwrap()
        .then(() => {
          dispatch(addNotification({
            type: 'success',
            message: 'Task deleted successfully'
          }));
          navigate('/tasks');
        })
        .catch(error => {
          dispatch(addNotification({
            type: 'error',
            message: 'Failed to delete task'
          }));
        });
    }
  };
  
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Normal Priority';
    }
  };
  
  // Calculate days left or overdue
  const getDueStatus = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (task.completed) {
      return 'Completed';
    } else if (dayDiff < 0) {
      return `${Math.abs(dayDiff)} ${Math.abs(dayDiff) === 1 ? 'day' : 'days'} overdue`;
    } else if (dayDiff === 0) {
      return 'Due today';
    } else {
      return `${dayDiff} ${dayDiff === 1 ? 'day' : 'days'} left`;
    }
  };
  
  return (
    <Container>
      <BackLink onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back to tasks
      </BackLink>
      
      <TaskDetailCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isEditing ? (
          <TaskForm 
            initialData={task} 
            onSubmit={handleUpdate} 
            onCancel={() => setIsEditing(false)} 
          />
        ) : (
          <>
            <TaskHeader>
              <TaskTitle>{task.title}</TaskTitle>
              <ActionButtons>
                <ActionButton 
                  type="edit" 
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit task"
                >
                  <FiEdit size={18} />
                </ActionButton>
                <ActionButton 
                  type="delete" 
                  onClick={handleDelete}
                  aria-label="Delete task"
                >
                  <FiTrash2 size={18} />
                </ActionButton>
              </ActionButtons>
            </TaskHeader>
            
            <TaskMeta>
              <MetaItem>
                <MetaLabel>
                  <FiFlag /> Priority
                </MetaLabel>
                <MetaValue>{getPriorityLabel(task.priority)}</MetaValue>
              </MetaItem>
              
              <MetaItem>
                <MetaLabel>
                  <FiTag /> Category
                </MetaLabel>
                <MetaValue>{task.category}</MetaValue>
              </MetaItem>
              
              <MetaItem>
                <MetaLabel>
                  <FiCalendar /> Due Date
                </MetaLabel>
                <MetaValue>{formatDate(task.dueDate)}</MetaValue>
              </MetaItem>
              
              <MetaItem>
                <MetaLabel>
                  <FiClock /> Status
                </MetaLabel>
                <MetaValue>{getDueStatus()}</MetaValue>
              </MetaItem>
            </TaskMeta>
            
            <CompletionStatus completed={task.completed}>
              {task.completed ? '✓ This task has been completed' : '⌛ This task is still in progress'}
            </CompletionStatus>
          </>
        )}
      </TaskDetailCard>
    </Container>
  );
};

export default TaskDetails; 