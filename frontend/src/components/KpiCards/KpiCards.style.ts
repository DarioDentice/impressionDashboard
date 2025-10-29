import styled, { keyframes } from 'styled-components';

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

export const KpiCard = styled.div`
  background: #ffffff;
  padding: 20px 24px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &[data-loading="true"] {
    height: 100px; 
    background: #f5f5f5;
    animation: ${pulse} 1.5s infinite ease-in-out;
  }
`;

export const KpiTitle = styled.h4`
  font-size: 14px;
  color: #8c8c8c;
  margin: 0 0 8px 0;
  font-weight: 500;
  white-space: nowrap;
`;

export const KpiValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #262626;
  
  span.suffix {
    font-size: 16px;
    font-weight: 400;
    color: #8c8c8c;
    margin-left: 8px;
  }
`;

export const KpiPercent = styled.span<{ $isPositive: boolean }>`
  font-size: 16px;
  margin-left: 8px;
  color: ${props => (props.$isPositive ? '#3f8600' : '#cf1322')};

  &::before {
    content: '${props => (props.$isPositive ? '▲' : '▼')}';
    margin-right: 4px;
  }
`;