import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filter: 'all', // 'all' | 'active' | 'completed'
  searchTerm: '',
};

// Simulated API functions (in a real app these would call a backend)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockTasks = [
  { id: 1, title: 'Learn React', completed: true, priority: 'high', category: 'learning', dueDate: '2023-12-01' },
  { id: 2, title: 'Build a Todo App', completed: false, priority: 'medium', category: 'work', dueDate: '2023-12-15' },
  { id: 3, title: 'Deploy to Production', completed: false, priority: 'high', category: 'work', dueDate: '2023-12-31' },
  { id: 4, title: 'Write Tests', completed: false, priority: 'medium', category: 'work', dueDate: '2023-12-20' },
  { id: 5, title: 'Study Redux', completed: false, priority: 'high', category: 'learning', dueDate: '2023-12-10' },
];

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  await delay(500); // Simulating network request
  return mockTasks;
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
  await delay(300);
  return {
    id: Date.now(),
    title: newTask.title,
    completed: false,
    priority: newTask.priority || 'medium',
    category: newTask.category || 'personal',
    dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
  };
});

export const toggleTask = createAsyncThunk('tasks/toggleTask', async (id) => {
  await delay(200);
  return id;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await delay(200);
  return id;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, updatedFields }) => {
  await delay(300);
  return { id, updatedFields };
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      // Toggle task
      .addCase(toggleTask.fulfilled, (state, action) => {
        const task = state.tasks.find(task => task.id === action.payload);
        if (task) {
          task.completed = !task.completed;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const { id, updatedFields } = action.payload;
        const task = state.tasks.find(task => task.id === id);
        if (task) {
          Object.assign(task, updatedFields);
        }
      });
  },
});

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;

export const selectFilteredTasks = (state) => {
  const { tasks, filter, searchTerm } = state.tasks;
  return tasks
    .filter(task => {
      if (filter === 'all') return true;
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter(task => 
      searchTerm === '' || task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export const selectTaskById = (state, taskId) => 
  state.tasks.tasks.find(task => task.id === taskId);

export const { setFilter, setSearchTerm } = tasksSlice.actions;

export default tasksSlice.reducer; 