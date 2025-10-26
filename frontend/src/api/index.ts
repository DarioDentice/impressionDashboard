import axios from 'axios';
import type { CountryFilter, DeviceStat, TimeStat, StateStat, YearStat } from '../types';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Il tuo server backend
});

async function fetchStats<T>(endpoint: string, country: CountryFilter): Promise<T> {
    const response = await api.get<T>(endpoint, {
        params: { country },
    });
    return response.data;
}

export const getDeviceStats = (country: CountryFilter) => fetchStats<DeviceStat[]>('/stats/by-device', country);
export const getHourStats = (country: CountryFilter) => fetchStats<TimeStat[]>('/stats/by-hour', country);
export const getDayOfWeekStats = (country: CountryFilter) => fetchStats<TimeStat[]>('/stats/by-dow', country);
export const getMonthStats = (country: CountryFilter) => fetchStats<TimeStat[]>('/stats/by-month', country);
export const getStateStats = (country: CountryFilter) => fetchStats<StateStat[]>('/stats/by-state', country);
export const getBlackFridayStats = (country: CountryFilter) => fetchStats<YearStat[]>('/stats/black-friday', country);