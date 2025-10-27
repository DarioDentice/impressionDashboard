import {Bar, Pie} from 'react-chartjs-2';
import useFilters from '../../../context/FilterContext';
import {getDeviceStats} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import type {DeviceStat} from '../../../types';
import {ChartGrid, ChartContainer} from './DeviceCharts.style';
import {SkeletonWrapper} from '../../Card/Card.style';

interface DeviceChartsProps {
    showDetailedView?: boolean;
}

const DeviceCharts = ({showDetailedView = false}: DeviceChartsProps) => {
    const {country} = useFilters();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery<DeviceStat[]>({
        queryKey: ['deviceStats', country],
        queryFn: () => getDeviceStats(country),
    });

    if (isLoading) {
        return <SkeletonWrapper height={showDetailedView ? '400px' : undefined}/>;
    }

    if (isError) {
        return <p style={{color: 'red'}}>Error loading device data: {(error as Error).message}</p>;
    }

    const topData = data?.slice(0, 10) || [];

    const chartData = {
        labels: topData.map((deviceStat) => deviceStat.device_id),
        datasets: [{
            label: 'Impressions',
            data: topData.map((deviceStat) => deviceStat.impressions),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: '#fff',
            borderWidth: 1,
        }],
    };

    return (
        <ChartGrid>
            <ChartContainer>
                <Bar data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
            </ChartContainer>
            {showDetailedView && (
                <ChartContainer>
                    <Pie data={chartData} options={{responsive: true, maintainAspectRatio: false}}/>
                </ChartContainer>
            )}
        </ChartGrid>
    );
}

export default DeviceCharts;