import type {Impression} from '../types.d.ts';

const kpiData = [
    {
        device_id: 'DEV_NY_1',
        lat: 40.7,
        lng: -74.0,
        timestamp: 1704272400000,
        country: 'usa' as const,
        state: 'New York',
    },
    {
        device_id: 'INT_1',
        lat: 48.8,
        lng: 2.3,
        timestamp: 1704276000000,
        country: 'no-usa' as const,
        state: null,
    },

    {
        device_id: 'DEV_AL_1',
        lat: 32.8,
        lng: -86.7,
        timestamp: 1704186000000,
        country: 'usa' as const,
        state: 'Alabama',
    },

    {
        device_id: 'DEV_NY_1',
        lat: 40.8,
        lng: -74.1,
        timestamp: 1704189600000,
        country: 'usa' as const,
        state: 'New York',
    },

    {
        device_id: 'DEV_AL_1',
        lat: 32.8,
        lng: -86.7,
        timestamp: 1703930400000,
        country: 'usa' as const,
        state: 'Alabama',
    },

    {
        device_id: 'INT_1',
        lat: -33.8,
        lng: 151.2,
        timestamp: 1703500800000,
        country: 'no-usa' as const,
        state: null,
    },

    {
        device_id: 'INT_2',
        lat: 45.4,
        lng: 12.3,
        timestamp: 1703504400000,
        country: 'no-usa' as const,
        state: null,
    },
];

const otherData = [
    {
        device_id: 'INT_2',
        lat: 61.2,
        lng: -149.9,
        timestamp: 1700827200000,
        country: 'usa' as const,
        state: 'Alaska',
    },
    {
        device_id: 'DEV_AL_2',
        lat: 61.2,
        lng: -149.9,
        timestamp: 1700827200000,
        country: 'usa' as const,
        state: 'Alaska',
    },
    {
        device_id: 'INVALID_1',
        lat: NaN,
        lng: 0,
        timestamp: 1672542000000,
        country: 'not-found' as const,
        state: null,
    },
    {
        device_id: 'INVALID_2',
        lat: 1000,
        lng: 0,
        timestamp: 1672545600000,
        country: 'not-found' as const,
        state: null,
    },
];

const COMPLETE_MOCK_DATA: Impression[] = [...kpiData, ...otherData];

export default COMPLETE_MOCK_DATA;