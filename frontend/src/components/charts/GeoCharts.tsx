import { Bar } from 'react-chartjs-2';
import { useFilters } from '../../context/FilterContext';
import { getStateStats } from '../../api';
import { useQuery } from '@tanstack/react-query';

export function GeoCharts() {
    const { country } = useFilters();

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['stateStats', country],
        queryFn: () => getStateStats(country),
        // Opzionale: non ricaricare se il filtro non è 'all' o 'usa'
        enabled: country !== 'no-usa',
    });

    if (isLoading) return <p>Caricamento grafici geografici...</p>;
    if (isError) return <p style={{ color: 'red' }}>Errore caricamento stati: {error.message}</p>;

    // Se il filtro è 'no-usa', mostra un messaggio
    if (country === 'no-usa') {
        return (
            <section style={{ marginTop: '40px' }}>
                <h2>Impressioni per Stato (USA)</h2>
                <p>Il filtro 'Non-USA' è attivo. Nessun dato per stato da mostrare.</p>
            </section>
        );
    }

    // Limita ai primi 15 stati per leggibilità
    const topStates = data?.slice(0, 15) || [];

    const chartData = {
        labels: topStates.map((stateStat) => stateStat.state),
        datasets: [{
            label: 'Impressioni',
            data: topStates.map((stateStat) => stateStat.impressions),
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
    };

    return (
        <section style={{ marginTop: '40px' }}>
            <h2>Impressioni per Stato (Top 15 USA)</h2>
            <div style={{ height: '400px', position: 'relative' }}>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </section>
    );
}