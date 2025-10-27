import styled, {keyframes} from 'styled-components';

export const CardWrapper = styled.div`
    background: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const CardHeader = styled.div`
    padding: 16px 24px;
    border-bottom: 1px solid #f0f0f0;

    h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const CardBody = styled.div`
    padding: 24px;
    flex-grow: 1;
`;

const pulse = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
`;

export const SkeletonWrapper = styled.div<{ height?: string }>`
    padding: 24px;
    height: ${({height}) => height || '300px'}
    background: #f5f5f5;
    border-radius: 8px;
    animation: ${pulse} 1.5s infinite ease-in-out;
`;