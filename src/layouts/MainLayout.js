import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import NotificationCenter from '../components/Notification/NotificationCenter';
import { fetchTasks } from '../store/slices/tasksSlice';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const MainLayout = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(state => state.ui.sidebarOpen);
  
  useEffect(() => {
    // Load tasks when the app starts
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <LayoutContainer>
      <Sidebar isOpen={sidebarOpen} />
      <MainContent>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </MainContent>
      <NotificationCenter />
    </LayoutContainer>
  );
};

export default MainLayout; 