import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} data-testid="todo-form">
      <input
        type="text"
        className="todo-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="btn btn-add">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm; 