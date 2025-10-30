export type CountryFilter = 'all' | 'usa' | 'no-usa';

export type Pagination = { current: number; pageSize: number };

export type SortKeys = keyof Impression;

export interface Impression {
    device_id: string;
    lat: number;
    lng: number;
    timestamp: number;
    country: 'USA' | 'no-usa' | 'not-found';
    state: string | null;
}

export interface PaginatedResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: Impression[];
}

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
export interface YearlyTrend {
    year: number;
    impressions: number;
    changePercent: number | null;
}

export interface KpiData {
    totalImpressions: number;
    yearlyTrends: YearlyTrend[];
    topDevice: { id: string; impressions: number } | null;
}