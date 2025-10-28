import type {Impression} from "../types";

export const mockDeviceStats = [
    {device_id: 'MOCK_DEV_A', impressions: 150},
    {device_id: 'MOCK_DEV_B', impressions: 95},
    {device_id: 'MOCK_DEV_C', impressions: 30},
];

export const mockImpressions: Impression[] = [
    {
        device_id: 'a1',
        lat: 34,
        lng: -118,
        timestamp: new Date('2023-11-20T10:00:00Z').getTime(),
        country: 'USA',
        state: 'CA'
    },
    {
        device_id: 'a2',
        lat: 40,
        lng: -74,
        timestamp: new Date('2023-11-20T11:00:00Z').getTime(),
        country: 'USA',
        state: 'NY'
    },
    {
        device_id: 'a1',
        lat: 34,
        lng: -118,
        timestamp: new Date('2023-11-20T12:00:00Z').getTime(),
        country: 'USA',
        state: 'CA'
    },
    {
        device_id: 'b1',
        lat: 51,
        lng: 0,
        timestamp: new Date('2023-11-21T10:30:00Z').getTime(),
        country: 'no-usa',
        state: null
    },
    {
        device_id: 'c1',
        lat: 38,
        lng: -97,
        timestamp: new Date('2023-11-21T14:00:00Z').getTime(),
        country: 'USA',
        state: 'KS'
    },
    {
        device_id: 'a1',
        lat: 34,
        lng: -118,
        timestamp: new Date('2023-11-22T09:00:00Z').getTime(),
        country: 'USA',
        state: 'CA'
    },
    {
        device_id: 'a2',
        lat: 40,
        lng: -74,
        timestamp: new Date('2023-11-22T10:15:00Z').getTime(),
        country: 'USA',
        state: 'NY'
    },
    {
        device_id: 'd1',
        lat: 48,
        lng: 2,
        timestamp: new Date('2023-11-22T15:00:00Z').getTime(),
        country: 'no-usa',
        state: null
    },
    {
        device_id: 'a1',
        lat: 34,
        lng: -118,
        timestamp: new Date('2023-11-21T09:00:00Z').getTime(),
        country: 'USA',
        state: 'CA'
    },
    {
        device_id: 'a2',
        lat: 40,
        lng: -74,
        timestamp: new Date('2023-11-21T10:15:00Z').getTime(),
        country: 'USA',
        state: 'NY'
    },
    {
        device_id: 'e1',
        lat: 30,
        lng: -80,
        timestamp: new Date('2023-11-13T10:00:00Z').getTime(),
        country: 'USA',
        state: 'FL'
    },
];

export const mockPaginatedImpressions =
    {
        totalItems: 11,
        totalPages: 3,
        currentPage: 1,
        data: mockImpressions
    }


export const mockHourStats = [
    {hour: 0, impressions: 5},
    {hour: 1, impressions: 2},
    {hour: 2, impressions: 2},
    {hour: 3, impressions: 2},
    {hour: 4, impressions: 6},
    {hour: 5, impressions: 2},
    {hour: 6, impressions: 2},
    {hour: 7, impressions: 12},
    {hour: 8, impressions: 20},
    {hour: 9, impressions: 16},
    {hour: 10, impressions: 40},
    {hour: 11, impressions: 95},
    {hour: 12, impressions: 85},
    {hour: 13, impressions: 85},
    {hour: 14, impressions: 15},
    {hour: 15, impressions: 25},
    {hour: 16, impressions: 35},
    {hour: 17, impressions: 55},
    {hour: 18, impressions: 65},
    {hour: 19, impressions: 65},
    {hour: 20, impressions: 65},
    {hour: 21, impressions: 65},
    {hour: 22, impressions: 25},
    {hour: 23, impressions: 35},
];

export const mockStateStats = [
    {state: 'California', impressions: 80},
    {state: 'New York', impressions: 50},
];

export const mockBlackFridayStats = [
    {year: 2022, impressions: 120},
    {year: 2023, impressions: 180},
    {year: 2024, impressions: 165},
];

export const mockByDay = [
    {day: 0, impressions: 120},
    {day: 1, impressions: 880},
    {day: 2, impressions: 165},
    {day: 3, impressions: 465},
    {day: 4, impressions: 765},
    {day: 5, impressions: 85},
    {day: 6, impressions: 65},
];

export const mockByMonth = [
    {year: 0, impressions: 120},
    {year: 1, impressions: 180},
    {year: 2, impressions: 165},
    {year: 3, impressions: 165},
    {year: 4, impressions: 195},
    {year: 5, impressions: 115},
    {year: 6, impressions: 55},
    {year: 7, impressions: 185},
    {year: 8, impressions: 197},
    {year: 9, impressions: 100},
    {year: 10, impressions: 255},
    {year: 11, impressions: 175},
];

export const mockOverview =
    [
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
        {
            totalImpressions: 11,
            dailyChangePercent: 36.36,
            weeklyChangePercent: 0.0,
            topDevice: {id: 'a1', impressions: 4},
        },
    ];