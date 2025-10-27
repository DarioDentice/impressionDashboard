import styled from 'styled-components';

export const TableWrapper = styled.div`
    overflow-x: auto;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 12px 16px;
        border-bottom: 1px solid #f0f0f0;
        text-align: left;
        white-space: nowrap;
    }

    thead th {
        background: #fafafa;
        font-weight: 600;
    }

    tbody tr:hover {
        background: #f5f5f5;
    }

    tbody td.loading-cell {
        text-align: center;
        color: #8c8c8c;
        height: 200px;
    }
`;

export const PaginationControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    button {
        padding: 8px 12px;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        cursor: pointer;

        &:hover:not(:disabled) {
            border-color: #1890ff;
            color: #1890ff;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    span {
        font-size: 14px;
        color: #595959;
    }
`;