import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import * as Style from './DataExplorer.style';
import {useFilters} from '../../context/FilterContext';
import {getRawImpressions} from '../../api';
import type {Impression, PaginatedResponse} from '../../types';

export function DataExplorer() {
    const {country} = useFilters();
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});

    const {data, isLoading, isError, error} = useQuery<PaginatedResponse>({
        queryKey: ['getImpressions', country, pagination.current, pagination.pageSize],
        queryFn: () => getRawImpressions(country, pagination.current, pagination.pageSize),
        placeholderData: (previousData) => previousData,
    });

    const handlePageChange = (newPage: number) => {
        setPagination(pageInfo => ({...pageInfo, current: newPage}));
    };

    if (isError) {
        return <div>Loading Error: {error.message}</div>;
    }

    return (
        <div>
            <Style.TableWrapper>
                <Style.StyledTable>
                    <thead>
                    <tr>
                        <th>Device ID</th>
                        <th>Timestamp</th>
                        <th>Country</th>
                        <th>State (USA)</th>
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
                </Style.StyledTable>
            </Style.TableWrapper>

            <Style.PaginationControls>
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
            </Style.PaginationControls>
        </div>
    );
}