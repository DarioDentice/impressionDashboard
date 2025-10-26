import type {Impression} from '../types.d.ts';

const COMPLETE_MOCK_DATA:Impression[] = [
    {
        device_id: 'DEV_NY_1',
        lat: 40.7,
        lng: -74.0,
        timestamp: 1704067200000,
        country: 'usa' as const,
        state: 'New York'
    },
    {
        device_id: 'DEV_AL_1',
        lat: 32.8,
        lng: -86.7,
        timestamp: 1704153600000,
        country: 'usa' as const,
        state: 'Alabama'
    },
    {
        device_id: 'DEV_NY_1',
        lat: 40.8,
        lng: -74.1,
        timestamp: 1704240000000,
        country: 'usa' as const,
        state: 'New York'
    },
    {
        device_id: 'DEV_AL_2',
        lat: 61.2,
        lng: -149.9,
        timestamp: 1700827200000,
        country: 'usa' as const,
        state: 'Alaska'
    },
    {
        device_id: 'INT_1',
        lat: 48.8,
        lng: 2.3,
        timestamp: 1672534800000,
        country: 'no-usa' as const,
        state: null
    },
    {
        device_id: 'INT_1',
        lat: -33.8,
        lng: 151.2,
        timestamp: 1672538400000,
        country: 'no-usa' as const,
        state: null
    },

    {
        device_id: 'INVALID_1',
        lat: NaN, // Latitudine non valida
        lng: 0,
        timestamp: 1672542000000,
        country: 'not-found' as const,
        state: null
    },
    {
        device_id: 'INVALID_2',
        lat: 1000, // Valore fuori range
        lng: 0,
        timestamp: 1672545600000,
        country: 'not-found' as const,
        state: null
    }
];

export default COMPLETE_MOCK_DATA;