import {Bar} from 'react-chartjs-2';
import {useFilters} from '../../../context/FilterContext';
import {getStateStats} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import type {StateStat} from '../../../types';
import * as Style from './GeoCharts.style';
import {SkeletonWrapper} from '../../Card/Card.style';

export function GeoCharts() {
    const {country} = useFilters();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<StateStat[]>({
        queryKey: ['stateStats', country],
        queryFn: () => getStateStats(country),
        enabled: country !== 'no-usa',
    });

    if (isLoading) {
        return <SkeletonWrapper height={'400'}/>;
    }

    if (isError) {
        return <p style={{color: 'red'}}>Error loading state data: {(error as Error).message}</p>;
    }

    if (country === 'no-usa') {
        return (
            <Style.EmptyState>
                Geo chart shows US data only. (Filter set to 'Non-USA').
            </Style.EmptyState>
        );
    }

    const topStates = data?.slice(0, 15) || [];

    const chartData = {
        labels: topStates.map((stateStat) => stateStat.state),
        datasets: [{
            label: 'Impressions',
            data: topStates.map((stateStat) => stateStat.impressions),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
    };

    return (
        <Style.ChartContainer>
            <Bar data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
        </Style.ChartContainer>
    );
}