import { Bar, Pie } from 'react-chartjs-2';
import { useFilters } from '../../context/FilterContext';
import { getDeviceStats } from '../../api';
import { useQuery } from '@tanstack/react-query';

export function DeviceCharts() {
    const { country } = useFilters();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['deviceStats', country],
        queryFn: () => getDeviceStats(country),
    });

    if (isLoading) return <p>Caricamento grafici dispositivi...</p>;

    if (isError) {
        return <p style={{ color: 'red' }}>Errore nel caricamento: {error.message}</p>;
    }

    const topData = data?.slice(0, 10) || [];
    const chartData = {
        labels: topData.map(data => data.device_id),
        datasets: [{
            label: 'Impressioni',
            data: topData.map(data => data.impressions),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    return (
        <section>
            <h2>Impressioni per Dispositivo (Top 10)</h2>
            <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
        </section>
    );
}