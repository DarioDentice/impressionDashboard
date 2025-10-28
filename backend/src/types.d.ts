export type CountryFilter = 'all' | 'usa' | 'no-usa';

export interface StatQuery {
    country?: CountryFilter;
}

export type RawCountryFilter = 'all' | 'usa' | 'no-usa' | 'not-found';

export type SortKeys = keyof Impression;

export interface RawDataQuery {
    country?: RawCountryFilter;
    page?: string;
    limit?: string;
    sortBy?: SortKeys;
    sortOrder?: 'asc' | 'desc';
}

export interface Impression {
    device_id: string;
    lat: number;
    lng: number;
    timestamp: number;
    country: 'usa' | 'no-usa' | 'not-found';
    state: string | null;
}

export interface DeviceStat {
    device_id: string;
    impressions: number;
}

export interface HourStat {
    hour: number;
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

export interface KpiData {
    totalImpressions: number;
    dailyChangePercent: number | null;
    weeklyChangePercent: number | null;
    topDevice: { id: string; impressions: number } | null;
}
