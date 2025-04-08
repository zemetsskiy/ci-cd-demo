import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { removeNotification } from '../../store/slices/uiSlice';
import { FiX, FiInfo, FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 320px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled(motion.div)`
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px ${props => props.theme.shadow};
  display: flex;
  align-items: center;
  background-color: ${props => {
    switch (props.type) {
      case 'error': return `${props.theme.error}15`;
      case 'success': return `${props.theme.success}15`;
      case 'warning': return `${props.theme.warning}15`;
      default: return `${props.theme.info}15`;
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'error': return props.theme.error;
      case 'success': return props.theme.success;
      case 'warning': return props.theme.warning;
      default: return props.theme.info;
    }
  }};
`;

const IconContainer = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: ${props => {
    switch (props.type) {
      case 'error': return props.theme.error;
      case 'success': return props.theme.success;
      case 'warning': return props.theme.warning;
      default: return props.theme.info;
    }
  }};
`;

const MessageContainer = styled.div`
  flex: 1;
`;

const Message = styled.p`
  margin: 0;
  color: ${props => props.theme.text};
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textLight};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin-left: 12px;
  
  &:hover {
    color: ${props => props.theme.text};
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'error':
      return <FiAlertCircle />;
    case 'success':
      return <FiCheckCircle />;
    case 'warning':
      return <FiAlertTriangle />;
    default:
      return <FiInfo />;
  }
};

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.ui.notifications);
  
  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };
  
  const notificationVariants = {
    initial: { opacity: 0, y: -20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };
  
  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={notificationVariants}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <IconContainer type={notification.type}>
              {getIcon(notification.type)}
            </IconContainer>
            <MessageContainer>
              <Message>{notification.message}</Message>
            </MessageContainer>
            <CloseButton onClick={() => handleClose(notification.id)}>
              <FiX />
            </CloseButton>
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default NotificationCenter; 