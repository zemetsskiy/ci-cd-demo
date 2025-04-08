import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoForm from '../components/TodoForm/TodoForm';

describe('TodoForm Component', () => {
  const mockAdd = jest.fn();

  beforeEach(() => {
    mockAdd.mockClear();
  });

  test('renders form with input and button', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Check if input and button are present
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('input value changes when typed', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Get the input element
    const input = screen.getByPlaceholderText('Add a new task...');
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Check if input value was updated
    expect(input.value).toBe('New Test Todo');
  });

  test('calls onAdd with input value when form is submitted', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Get the input element and form
    const input = screen.getByPlaceholderText('Add a new task...');
    const form = screen.getByTestId('todo-form');
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if onAdd was called with the correct value
    expect(mockAdd).toHaveBeenCalledWith('New Test Todo');
  });

  test('clears input after form submission', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Get the input element and form
    const input = screen.getByPlaceholderText('Add a new task...');
    const form = screen.getByTestId('todo-form');
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if input is cleared
    expect(input.value).toBe('');
  });

  test('does not call onAdd when form is submitted with empty input', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Get the form
    const form = screen.getByTestId('todo-form');
    
    // Submit the form with empty input
    fireEvent.submit(form);
    
    // Check if onAdd was not called
    expect(mockAdd).not.toHaveBeenCalled();
  });

  test('does not call onAdd when form is submitted with whitespace only', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Get the input element and form
    const input = screen.getByPlaceholderText('Add a new task...');
    const form = screen.getByTestId('todo-form');
    
    // Simulate typing whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    
    // Submit the form
    fireEvent.submit(form);
    
    // Check if onAdd was not called
    expect(mockAdd).not.toHaveBeenCalled();
  });

  test('clicking Add Task button submits the form', () => {
    render(<TodoForm onAdd={mockAdd} />);
    
    // Get the input element and button
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByText('Add Task');
    
    // Simulate typing
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    
    // Click the button
    fireEvent.click(button);
    
    // Check if onAdd was called with the correct value
    expect(mockAdd).toHaveBeenCalledWith('New Test Todo');
  });
});