import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  padding: 1.5rem;
  height: 100%;
`;

export const SummaryCard = styled.div`
  background-color: ${props => props.color || props.theme.surface};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
`; 