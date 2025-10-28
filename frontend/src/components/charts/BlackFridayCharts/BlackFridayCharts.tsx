import {Line} from 'react-chartjs-2';
import {useFilters} from '../../../context';
import {getBlackFridayStats} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import type {YearStat} from '../../../types';
import {ChartContainer} from './BlackFridayCharts.style';
import {SkeletonWrapper} from '../../Card/Card.style';

const BlackFridayCharts = () => {
    const {country} = useFilters();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<YearStat[]>({
        queryKey: ['blackFridayStats', country],
        queryFn: () => getBlackFridayStats(country),
    });

    if (isLoading) {
        return <SkeletonWrapper/>;
    }

    if (isError) {
        return <p style={{color: 'red'}}>Error loading Black Friday data: {(error as Error).message}</p>;
    }

    const chartData = {
        labels: data?.map(({year}: YearStat) => year),
        datasets: [{
            label: 'Black Friday Impressions',
            data: data?.map(({impressions}: YearStat) => impressions),
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
            tension: 0.1
        }],
    };

    return (
        <ChartContainer>
            <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
        </ChartContainer>
    );
}

export default BlackFridayCharts;