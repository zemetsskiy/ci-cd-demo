import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../components/Todo/Todo';

// Sample todo item
const sampleTodo = {
  id: 1,
  title: 'Test Todo',
  completed: false
};

describe('Todo Component', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();
  const mockEdit = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockToggle.mockReset();
    mockDelete.mockReset();
    mockEdit.mockReset();
  });

  test('renders todo item correctly', () => {
    render(
      <Todo
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Check if todo title is rendered
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    
    // Check if checkbox is unchecked (as completed is false)
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(
      <Todo
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Click on the checkbox
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Check if onToggle was called with the correct todo id
    expect(mockToggle).toHaveBeenCalledWith(sampleTodo.id);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <Todo
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Click on the delete button
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    
    // Check if onDelete was called with the correct todo id
    expect(mockDelete).toHaveBeenCalledWith(sampleTodo.id);
  });

  test('enters edit mode when edit button is clicked', () => {
    render(
      <Todo
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Click on the edit button
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    // Check if we're in edit mode (input field and save/cancel buttons appear)
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('calls onEdit with updated title when save button is clicked', () => {
    render(
      <Todo
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Enter edit mode
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    // Update the input value
    const input = screen.getByDisplayValue('Test Todo');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    
    // Click save button
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);
    
    // Check if onEdit was called with correct parameters
    expect(mockEdit).toHaveBeenCalledWith(sampleTodo.id, 'Updated Todo');
  });

  test('reverts to original title when cancel button is clicked', () => {
    render(
      <Todo
        todo={sampleTodo}
        onToggle={mockToggle}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Enter edit mode
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    
    // Update the input value
    const input = screen.getByDisplayValue('Test Todo');
    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    
    // Click cancel button
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    
    // Check if we're back to view mode with original text
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(mockEdit).not.toHaveBeenCalled();
  });
}); 