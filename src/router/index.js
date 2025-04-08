import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../features/dashboard/Dashboard';
import TaskList from '../features/tasks/TaskList';
import TaskDetails from '../features/tasks/TaskDetails';
import Settings from '../features/settings/Settings';
import NotFound from '../features/error/NotFound';
import Statistics from '../features/statistics/Statistics';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'tasks', element: <TaskList /> },
      { path: 'tasks/:taskId', element: <TaskDetails /> },
      { path: 'statistics', element: <Statistics /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]); 