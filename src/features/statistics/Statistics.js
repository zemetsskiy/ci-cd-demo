import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { selectAllTasks } from '../../store/slices/tasksSlice';
import { 
  FiPieChart, 
  FiBarChart2, 
  FiTrendingUp,
  FiFlag,
  FiTag
} from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-bottom: 2.5rem;
`;

const StatsCard = styled(motion.div)`
  background-color: ${props => props.theme.surface};
  border-radius: 8px;
  box-shadow: 0 2px 6px ${props => props.theme.shadow};
  padding: 2rem;
  height: 100%;
`;

const StatsCardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatsCardTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0;
  color: ${props => props.theme.text};
  
  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
    color: ${props => props.theme.primary};
  }
`;

const ChartContainer = styled.div`
  height: 200px;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
`;

const BarChart = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  width: 100%;
  height: 100%;
`;

const ChartBar = styled.div`
  flex: 1;
  margin: 0 5px;
  background-color: ${props => props.color || props.theme.primary};
  height: ${props => props.height || '50%'};
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
  position: relative;
  
  &:hover::after {
    content: '${props => props.label}: ${props => props.value}';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    box-shadow: 0 2px 4px ${props => props.theme.shadow};
    z-index: 10;
  }
`;

const PieChart = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  background: conic-gradient(
    ${props => props.segments.map(segment => 
      `${segment.color} 0deg ${segment.angle}deg`
    ).join(', ')}
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: ${props => props.theme.surface};
  }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${props => props.color};
  margin-right: 0.5rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 2rem;
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SummaryValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 0.25rem;
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.textLight};
`;

const NoDataMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${props => props.theme.textLight};
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const Statistics = () => {
  const tasks = useSelector(selectAllTasks);
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;
  
  const tasksByPriority = useMemo(() => {
    const result = { high: 0, medium: 0, low: 0 };
    tasks.forEach(task => {
      if (result[task.priority]) {
        result[task.priority]++;
      } else {
        result.medium++;
      }
    });
    return result;
  }, []);
  
  const tasksByCategory = useMemo(() => {
    const categoryCounts = {};
    tasks.forEach(task => {
      const category = task.category || 'uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count
    }));
  }, []);
  
  const tasksByStatus = useMemo(() => {
    return {
      completed: completedTasks,
      active: totalTasks - completedTasks
    };
  }, [completedTasks, totalTasks]);
  
  const pieChartData = useMemo(() => {
    if (totalTasks === 0) return [];
    
    const statusColors = {
      completed: '#28a745',
      active: '#ffc107'
    };
    
    let startAngle = 0;
    const segments = Object.entries(tasksByStatus).map(([status, count]) => {
      const percentage = (count / totalTasks) * 100;
      const angle = (percentage * 360) / 100;
      const segment = {
        status,
        count,
        percentage: Math.round(percentage),
        color: statusColors[status],
        startAngle,
        angle: startAngle + angle
      };
      startAngle += angle;
      return segment;
    });
    
    return segments;
  }, [tasksByStatus, totalTasks]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };
  
  return (
    <Container>
      <Title>Statistics</Title>
      
      {totalTasks > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <StatsCard variants={itemVariants}>
            <StatsCardHeader>
              <StatsCardTitle>
                <FiTrendingUp /> Task Overview
              </StatsCardTitle>
            </StatsCardHeader>
            
            <SummaryGrid>
              <SummaryItem>
                <SummaryValue>{totalTasks}</SummaryValue>
                <SummaryLabel>Total Tasks</SummaryLabel>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryValue>{completedTasks}</SummaryValue>
                <SummaryLabel>Completed</SummaryLabel>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryValue>{totalTasks - completedTasks}</SummaryValue>
                <SummaryLabel>Active</SummaryLabel>
              </SummaryItem>
              
              <SummaryItem>
                <SummaryValue>{completionRate}%</SummaryValue>
                <SummaryLabel>Completion Rate</SummaryLabel>
              </SummaryItem>
            </SummaryGrid>
          </StatsCard>
          
          <StatisticsGrid>
            <StatsCard variants={itemVariants}>
              <StatsCardHeader>
                <StatsCardTitle>
                  <FiPieChart /> Completion Status
                </StatsCardTitle>
              </StatsCardHeader>
              
              <ChartContainer>
                {pieChartData.length > 0 ? (
                  <PieChart segments={pieChartData} />
                ) : (
                  <NoDataMessage>
                    <FiPieChart />
                    <p>No data available</p>
                  </NoDataMessage>
                )}
              </ChartContainer>
              
              <Legend>
                <LegendItem>
                  <LegendColor color="#28a745" />
                  Completed ({tasksByStatus.completed})
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#ffc107" />
                  Active ({tasksByStatus.active})
                </LegendItem>
              </Legend>
            </StatsCard>
            
            <StatsCard variants={itemVariants}>
              <StatsCardHeader>
                <StatsCardTitle>
                  <FiFlag /> Tasks by Priority
                </StatsCardTitle>
              </StatsCardHeader>
              
              <ChartContainer>
                {Object.keys(tasksByPriority).length > 0 ? (
                  <BarChart>
                    <ChartBar 
                      height={`${(tasksByPriority.high / Math.max(...Object.values(tasksByPriority))) * 100}%`}
                      color="#dc3545"
                      label="High"
                      value={tasksByPriority.high}
                    />
                    <ChartBar 
                      height={`${(tasksByPriority.medium / Math.max(...Object.values(tasksByPriority))) * 100}%`}
                      color="#ffc107"
                      label="Medium"
                      value={tasksByPriority.medium}
                    />
                    <ChartBar 
                      height={`${(tasksByPriority.low / Math.max(...Object.values(tasksByPriority))) * 100}%`}
                      color="#17a2b8"
                      label="Low"
                      value={tasksByPriority.low}
                    />
                  </BarChart>
                ) : (
                  <NoDataMessage>
                    <FiBarChart2 />
                    <p>No data available</p>
                  </NoDataMessage>
                )}
              </ChartContainer>
              
              <Legend>
                <LegendItem>
                  <LegendColor color="#dc3545" />
                  High ({tasksByPriority.high})
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#ffc107" />
                  Medium ({tasksByPriority.medium})
                </LegendItem>
                <LegendItem>
                  <LegendColor color="#17a2b8" />
                  Low ({tasksByPriority.low})
                </LegendItem>
              </Legend>
            </StatsCard>
            
            <StatsCard variants={itemVariants}>
              <StatsCardHeader>
                <StatsCardTitle>
                  <FiTag /> Tasks by Category
                </StatsCardTitle>
              </StatsCardHeader>
              
              <ChartContainer>
                {tasksByCategory.length > 0 ? (
                  <BarChart>
                    {tasksByCategory.map(({ name, count }) => {
                      const colors = ['#0070f3', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
                      const maxCount = Math.max(...tasksByCategory.map(item => item.count));
                      
                      return (
                        <ChartBar 
                          key={name}
                          height={`${(count / maxCount) * 100}%`}
                          color={colors[Object.keys(tasksByCategory).indexOf(name) % colors.length]}
                          label={name}
                          value={count}
                        />
                      );
                    })}
                  </BarChart>
                ) : (
                  <NoDataMessage>
                    <FiBarChart2 />
                    <p>No data available</p>
                  </NoDataMessage>
                )}
              </ChartContainer>
              
              <Legend>
                {tasksByCategory.map(({ name, count }) => {
                  const colors = ['#0070f3', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
                  
                  return (
                    <LegendItem key={name}>
                      <LegendColor color={colors[Object.keys(tasksByCategory).indexOf(name) % colors.length]} />
                      {name} ({count})
                    </LegendItem>
                  );
                })}
              </Legend>
            </StatsCard>
          </StatisticsGrid>
        </motion.div>
      ) : (
        <StatsCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NoDataMessage>
            <FiBarChart2 size={48} />
            <h3>No Task Data Available</h3>
            <p>Add some tasks to see your statistics here.</p>
          </NoDataMessage>
        </StatsCard>
      )}
    </Container>
  );
};

export default Statistics; 