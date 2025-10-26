export type CountryFilter = 'all' | 'usa' | 'no-usa';

export interface StatQuery {
    country?: CountryFilter;
}

export type RawCountryFilter = 'all' | 'usa' | 'no-usa' | 'not-found';

export interface RawDataQuery {
    country?: RawCountryFilter;
    page?: string;
    limit?: string;
}

export interface Impression {
    device_id: string;
    lat: number;
    lng: number;
    timestamp: number; // In millisecondi
    country: 'usa' | 'no-usa' | 'not-found';
    state: string | null;
}

// Tipi per i risultati aggregati

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
