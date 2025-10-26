// Definisce i tipi per il filtro e le risposte API
export type CountryFilter = 'all' | 'usa' | 'no-usa';

// Risposte API
export interface DeviceStat {
    device_id: string;
    impressions: number;
}
export interface TimeStat {
    hour?: number;
    day?: number;
    month?: number;
    impressions: number;
}
export interface StateStat {
    state: string;
    impressions: number;
}
export interface YearStat {
    year: number;
    impressions: number;
}