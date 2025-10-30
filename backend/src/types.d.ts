export type CountryFilter = 'all' | 'usa' | 'no-usa' |'not-found';

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
