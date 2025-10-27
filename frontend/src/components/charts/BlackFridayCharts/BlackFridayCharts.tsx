import {Line} from 'react-chartjs-2';
import {useFilters} from '../../../context/FilterContext';
import {getBlackFridayStats} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import type {YearStat} from '../../../types';
import * as Style from './BlackFridayCharts.style.ts';
import {SkeletonWrapper} from '../../Card/Card.style';

export function BlackFridayCharts() {
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
        labels: data?.map((yearStat) => yearStat.year),
        datasets: [{
            label: 'Black Friday Impressions',
            data: data?.map((yearStat) => yearStat.impressions),
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
            tension: 0.1
        }],
    };

    return (
        <Style.ChartContainer>
            <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
        </Style.ChartContainer>
    );
}