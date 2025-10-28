import {Bar} from 'react-chartjs-2';
import {useFilters} from '../../../context';
import {getStateStats} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import type {StateStat} from '../../../types';
import {EmptyState,ChartContainer} from './GeoCharts.style';
import {SkeletonWrapper} from '../../Card/Card.style';
import {ErrorMessage} from "../../ErrorMessage/ErrorMessage.tsx";

const GeoCharts = () => {
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
        return <ErrorMessage message={'Error loading state data: '} details={[(error as Error).message]} />;
    }

    if (country === 'no-usa') {
        return (
            <EmptyState>
                Geo chart shows US data only. (Filter set to 'Non-USA').
            </EmptyState>
        );
    }

    const topStates = data?.slice(0, 15) || [];

    const chartData = {
        labels: topStates.map(({state}: StateStat) => state),
        datasets: [{
            label: 'Impressions',
            data: topStates.map(({impressions}: StateStat) => impressions),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
    };

    return (
        <ChartContainer>
            <Bar data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
        </ChartContainer>
    );
}

export default GeoCharts;