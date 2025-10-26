import { Line } from 'react-chartjs-2';
import { useFilters } from '../../context/FilterContext';
import { getBlackFridayStats } from '../../api';
import { useQuery } from '@tanstack/react-query';

export function BlackFridayChart() {
    const { country } = useFilters();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['blackFridayStats', country],
        queryFn: () => getBlackFridayStats(country),
    });

    if (isLoading) return <p>Caricamento dati Black Friday...</p>;
    if (isError) return <p style={{ color: 'red' }}>Errore caricamento Black Friday: {error.message}</p>;

    const chartData = {
        labels: data?.map((yearStat) => yearStat.year),
        datasets: [{
            label: 'Impressioni Black Friday',
            data: data?.map((yearStat) => yearStat.impressions),
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
        }],
    };

    return (
        <section style={{ marginTop: '40px' }}>
            <h2>Trend Impressioni Black Friday</h2>
            <div style={{ height: '300px', position: 'relative' }}>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </section>
    );
}