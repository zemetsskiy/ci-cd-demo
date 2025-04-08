import React, { useState, useEffect } from 'react';
import TodoForm from '../../components/TodoForm/TodoForm';
import Todo from '../../components/Todo/Todo';
import './TodoPage.css';

const TodoPage = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      { id: 1, title: 'Learn React', completed: true },
      { id: 2, title: 'Build a Todo App', completed: false },
      { id: 3, title: 'Deploy to production', completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, title) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title } : todo
      )
    );
  };

  const activeTasks = todos.filter(todo => !todo.completed).length;
  const completedTasks = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-page">
      <h1>Todo List</h1>
      
      <div className="todo-stats">
        <div className="stat-item">
          <span className="stat-value">{activeTasks}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{todos.length}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>
      
      <TodoForm onAdd={addTodo} />
      
      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet. Add a new task to get started!</p>
          </div>
        ) : (
          todos.map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoPage; 