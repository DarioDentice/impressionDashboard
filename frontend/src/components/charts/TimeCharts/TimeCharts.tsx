import {Line, Bar, Pie} from 'react-chartjs-2';
import {useFilters} from '../../../context/FilterContext';
import {getHourStats, getDayOfWeekStats, getMonthStats} from '../../../api';
import {useQuery} from '@tanstack/react-query';
import * as Style from './TimeCharts.style';
import {SkeletonWrapper} from '../../Card/Card.style';

interface TimeChartsProps {
    showDetailedView?: boolean;
}

const DOW_LABELS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PIE_COLORS = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
];

export function TimeCharts({showDetailedView = false}: TimeChartsProps) {
    const {country} = useFilters();

    const {
        data: hourData,
        isLoading: isLoadingHours,
        isError: isErrorHours,
        error: errorHours
    } = useQuery({
        queryKey: ['hourStats', country],
        queryFn: () => getHourStats(country),
    });

    const {
        data: dowData,
        isLoading: isLoadingDow,
        isError: isErrorDow,
        error: errorDow
    } = useQuery({
        queryKey: ['dayOfWeekStats', country],
        queryFn: () => getDayOfWeekStats(country),
        enabled: showDetailedView,
    });

    const {
        data: monthData,
        isLoading: isLoadingMonth,
        isError: isErrorMonth,
        error: errorMonth
    } = useQuery({
        queryKey: ['monthStats', country],
        queryFn: () => getMonthStats(country),
        enabled: showDetailedView,
    });

    const isLoading = isLoadingHours || (showDetailedView && (isLoadingDow || isLoadingMonth));

    if (isLoading) {
        return <SkeletonWrapper/>;
    }

    if (isErrorHours) return <p style={{color: 'red'}}>Error loading hour data: {(errorHours as Error).message}</p>;
    if (isErrorDow) return <p style={{color: 'red'}}>Error loading DOW data: {(errorDow as Error).message}</p>;
    if (isErrorMonth) return <p style={{color: 'red'}}>Error loading month data: {(errorMonth as Error).message}</p>;

    const hourChart = {
        labels: hourData?.map((hourStat) => `${hourStat.hour}:00`),
        datasets: [{
            label: 'Impressions per Hour', // Tradotto
            data: hourData?.map((hourStat) => hourStat.impressions),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
        }],
    };

    const dowChartData = {
        labels: dowData?.map((dowStat) => DOW_LABELS[dowStat.day!]),
        datasets: [{
            label: 'Impressions per Day of Week',
            data: dowData?.map((dowStat) => dowStat.impressions),
            backgroundColor: showDetailedView ? PIE_COLORS : 'rgb(54, 162, 235)',
        }],
    };

    const monthChartData = {
        labels: monthData?.map((monthStat) => MONTH_LABELS[monthStat.month!]),
        datasets: [{
            label: 'Impressions per Month',
            data: monthData?.map((monthStat) => monthStat.impressions),
            backgroundColor: 'rgb(75, 192, 192)',
        }],
    };

    return (
        <Style.ChartWrapper>
            <Style.ChartContainer>
                <Line data={hourChart} options={{responsive: true, maintainAspectRatio: false}}/>
            </Style.ChartContainer>
            {showDetailedView && (
                <>
                    <Style.SectionTitle>Day of Week Analysis</Style.SectionTitle>
                    <Style.ChartGrid>
                        <div>
                            <Bar data={dowChartData} options={{responsive: true, maintainAspectRatio: false}}/>
                        </div>
                        <div>
                            <Pie data={dowChartData} options={{responsive: true, maintainAspectRatio: false}}/>
                        </div>
                    </Style.ChartGrid>

                    <Style.SectionTitle>Monthly Analysis</Style.SectionTitle>
                    <Style.ChartContainer>
                        <Bar data={monthChartData} options={{responsive: true, maintainAspectRatio: false}}/>
                    </Style.ChartContainer>
                </>
            )}
        </Style.ChartWrapper>
    );
}