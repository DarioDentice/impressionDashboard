import styled from 'styled-components';

export const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    width: 100%;
`;

export const ChartContainer = styled.div`
    height: 400px;
    position: relative;
`;