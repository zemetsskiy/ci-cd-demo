import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCalendar, FiFlag, FiTag } from 'react-icons/fi';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${props => props.theme.primary};
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }
  
  &:hover {
    border-color: ${props => props.theme.primary}80;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  background-color: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.primary}40;
  }
  
  &:hover {
    border-color: ${props => props.theme.primary}80;
  }
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.error};
  font-size: 0.75rem;
  margin: 0.25rem 0 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.primary};
  color: white;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.primary}dd;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.textLight};
  border: 1px solid ${props => props.theme.border};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }
`;

const AdditionalFieldsToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.primary};
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  align-self: flex-start;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AdditionalFields = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {
      title: '',
      priority: 'medium',
      category: 'personal',
      dueDate: new Date().toISOString().split('T')[0]
    }
  });
  
  const submitHandler = (data) => {
    // If we're editing, preserve the original ID
    const taskData = initialData?.id ? { ...data, id: initialData.id } : data;
    onSubmit(taskData);
  };
  
  return (
    <FormContainer onSubmit={handleSubmit(submitHandler)}>
      <InputGroup>
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          {...register('title', { 
            required: 'Task title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long'
            }
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </InputGroup>
      
      <AdditionalFieldsToggle 
        type="button" 
        onClick={() => setShowAdditionalFields(!showAdditionalFields)}
      >
        {showAdditionalFields ? 'Hide' : 'Show'} additional options
      </AdditionalFieldsToggle>
      
      {showAdditionalFields && (
        <AdditionalFields
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <InputGroup>
            <Label htmlFor="priority">
              <FiFlag /> Priority
            </Label>
            <Select id="priority" {...register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="category">
              <FiTag /> Category
            </Label>
            <Select id="category" {...register('category')}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="learning">Learning</option>
              <option value="health">Health</option>
              <option value="finance">Finance</option>
            </Select>
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="dueDate">
              <FiCalendar /> Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              {...register('dueDate')}
            />
          </InputGroup>
        </AdditionalFields>
      )}
      
      <ButtonGroup>
        {onCancel && (
          <SecondaryButton 
            type="button" 
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </SecondaryButton>
        )}
        <PrimaryButton 
          type="submit" 
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {initialData ? 'Save Changes' : 'Add Task'}
        </PrimaryButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default TaskForm; 