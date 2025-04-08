// Mock API service for todos
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockTodos = [
  { id: 1, title: 'Learn React', completed: true },
  { id: 2, title: 'Build a Todo App', completed: false },
  { id: 3, title: 'Deploy to production', completed: false }
];

export const api = {
  async getTodos() {
    // Simulate API delay
    await delay(500);
    return [...mockTodos];
  },
  
  async addTodo(title) {
    await delay(500);
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };
    mockTodos.push(newTodo);
    return newTodo;
  },
  
  async updateTodo(id, updates) {
    await delay(500);
    const todoIndex = mockTodos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      mockTodos[todoIndex] = { ...mockTodos[todoIndex], ...updates };
      return mockTodos[todoIndex];
    }
    throw new Error('Todo not found');
  },
  
  async deleteTodo(id) {
    await delay(500);
    const todoIndex = mockTodos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      const deleted = mockTodos.splice(todoIndex, 1)[0];
      return deleted;
    }
    throw new Error('Todo not found');
  }
};

export default api; 