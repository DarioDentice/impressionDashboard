import styled from 'styled-components';

export const DashboardGrid = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex-grow: 1;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

export const KpiSection = styled.section`
    width: 100%;
`;

export const ChartSection = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
    width: 100%;

    & > div {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
`;