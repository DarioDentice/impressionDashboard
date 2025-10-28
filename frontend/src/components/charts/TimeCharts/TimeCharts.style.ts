import styled from 'styled-components';

export const ChartWrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const ChartContainer = styled.div`
    height: 300px;
    position: relative;
`;

export const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;

    & > div {
        height: 300px;
        position: relative;
    }
`;

export const SectionTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #595959;
    margin-top: 16px;
    margin-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 8px;
`;