import {Line, Bar} from 'react-chartjs-2';
import {useFilters} from '../../context/FilterContext';
import {getHourStats, getDayOfWeekStats, getMonthStats} from '../../api';
import {useQuery} from '@tanstack/react-query';

const DOW_LABELS = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const MONTH_LABELS = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

export function TimeCharts() {
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
    });

    const {
        data: monthData,
        isLoading: isLoadingMonth,
        isError: isErrorMonth,
        error: errorMonth
    } = useQuery({
        queryKey: ['monthStats', country],
        queryFn: () => getMonthStats(country),
    });

    if (isLoadingHours || isLoadingDow || isLoadingMonth) {
        return <p>Caricamento grafici temporali...</p>;
    }

    if (isErrorHours) return <p style={{color: 'red'}}>Errore caricamento ore: {errorHours.message}</p>;
    if (isErrorDow) return <p style={{color: 'red'}}>Errore caricamento giorni: {errorDow.message}</p>;
    if (isErrorMonth) return <p style={{color: 'red'}}>Errore caricamento mesi: {errorMonth.message}</p>;

    const hourChart = {
        labels: hourData?.map((hourStat) => `${hourStat.hour}:00`),
        datasets: [{
            label: 'Impressioni per Ora',
            data: hourData?.map((hourStat) => hourStat.impressions),
            borderColor: 'rgb(255, 99, 132)'
        }],
    };

    const dowChart = {
        labels: dowData?.map((dowStat) => DOW_LABELS[dowStat.day!]),
        datasets: [{
            label: 'Impressioni per Giorno Sett.',
            data: dowData?.map((dowStat) => dowStat.impressions),
            backgroundColor: 'rgb(54, 162, 235)'
        }],
    };

    const monthChart = {
        labels: monthData?.map((monthStat) => MONTH_LABELS[monthStat.month!]),
        datasets: [{
            label: 'Impressioni per Mese',
            data: monthData?.map((monthStat) => monthStat.impressions),
            backgroundColor: 'rgb(75, 192, 192)'
        }],
    };

    return (
        <section style={{marginTop: '40px'}}>
            <h2>Analisi Temporale</h2>
            <div style={{height: '300px', position: 'relative'}}>
                <Line data={hourChart} options={{responsive: true, maintainAspectRatio: false}}/>
            </div>
            <div style={{display: 'flex', gap: '20px', height: '300px', marginTop: '20px'}}>
                <div style={{flex: 1, position: 'relative'}}>
                    <Bar data={dowChart} options={{responsive: true, maintainAspectRatio: false}}/>
                </div>
                <div style={{flex: 1, position: 'relative'}}>
                    <Bar data={monthChart} options={{responsive: true, maintainAspectRatio: false}}/>
                </div>
            </div>
        </section>
    );
}