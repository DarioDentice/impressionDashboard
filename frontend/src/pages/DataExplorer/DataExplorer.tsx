import {type FC, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {TableWrapper, StyledTable, PaginationControls} from './DataExplorer.style';
import {useFilters} from '../../context';
import {getRawImpressions} from '../../api';
import type {Impression, PaginatedResponse, Pagination, SortKeys} from '../../types';
import {ErrorMessage} from "../../components/ErrorMessage/ErrorMessage.tsx";

type SortConfig = {
    key: SortKeys;
    direction: 'asc' | 'desc';
};

const DataExplorer: FC = () => {
    const {country} = useFilters();
    const [pagination, setPagination] = useState<Pagination>({current: 1, pageSize: 10});
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    const {data, isLoading, isError, error} = useQuery<PaginatedResponse>({
        queryKey: ['getImpressions', country, pagination.current, pagination.pageSize,sortConfig],
        queryFn: () => getRawImpressions(country, pagination.current, pagination.pageSize,sortConfig?.key,sortConfig?.direction),
        placeholderData: (previousData?: PaginatedResponse) => previousData,
    });

    const handlePageChange = (newPage: number) => {
        setPagination((pageInfo: Pagination) => ({...pageInfo, current: newPage}));
    };

    const handleSort = (key: SortKeys) => {
        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        setPagination(p => ({ ...p, current: 1 }));
    };

    const getSortClasses = (key: SortKeys) => {
        if (!sortConfig || sortConfig.key !== key) return 'sortable';
        return `sortable ${sortConfig.direction}`;
    };

    if (isError) {
        return <ErrorMessage message={'Loading Error:'} details={[error.message]}/>;
    }

    return (
        <div>
            <TableWrapper>
                <StyledTable>
                    <thead>
                    <tr>
                        <th onClick={() => handleSort('device_id')} className={getSortClasses('device_id')}>
                            Device ID
                            <span className="sort-arrow asc">▲</span>
                            <span className="sort-arrow desc">▼</span>
                        </th>
                        <th onClick={() => handleSort('timestamp')} className={getSortClasses('timestamp')}>
                            Timestamp
                            <span className="sort-arrow asc">▲</span>
                            <span className="sort-arrow desc">▼</span>
                        </th>
                        <th>
                            Country
                        </th>
                        <th onClick={() => handleSort('state')} className={getSortClasses('state')}>
                            State (USA)
                            <span className="sort-arrow asc">▲</span>
                            <span className="sort-arrow desc">▼</span>
                        </th>
                        <th>Lat/Lng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={5} className="loading-cell">Loading...</td>
                        </tr>
                    )}
                    {!isLoading && data?.data.map((impression: Impression) => (
                        <tr key={impression.timestamp}>
                            <td>{impression.device_id}</td>
                            <td>{new Date(impression.timestamp).toLocaleString()}</td>
                            <td>{impression.country}</td>
                            <td>{impression.state || 'N/A'}</td>
                            <td>{impression.lat.toFixed(4)}, {impression.lng.toFixed(4)}</td>
                        </tr>
                    ))}
                    </tbody>
                </StyledTable>
            </TableWrapper>

            <PaginationControls>
                <button
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1 || isLoading}
                >
                    Previous
                </button>
                <span>
                    Page {pagination.current} of {data?.totalPages || 1}
                </span>
                <button
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === (data?.totalPages || 1) || isLoading}
                >
                    Next
                </button>
            </PaginationControls>
        </div>
    );
}

export default DataExplorer;