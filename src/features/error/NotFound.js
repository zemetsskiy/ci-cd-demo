import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
  height: 70vh;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 6rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const ErrorText = styled(motion.h2)`
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0 2rem;
  color: ${props => props.theme.text};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ErrorDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: ${props => props.theme.textLight};
  margin-bottom: 2rem;
  max-width: 500px;
`;

const BackButton = styled(motion.div)`
  margin-top: 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: ${props => props.theme.primary}dd;
    text-decoration: none;
  }
`;

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };
  
  return (
    <Container
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ErrorCode
        variants={itemVariants}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        404
      </ErrorCode>
      
      <ErrorText variants={itemVariants}>
        Page Not Found
      </ErrorText>
      
      <ErrorDescription variants={itemVariants}>
        The page you are looking for doesn't exist or has been moved.
      </ErrorDescription>
      
      <BackButton variants={itemVariants}>
        <BackLink 
          to="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft /> Back to Dashboard
        </BackLink>
      </BackButton>
    </Container>
  );
};

export default NotFound; 