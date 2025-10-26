import { http, HttpResponse } from 'msw';
import {
    mockDeviceStats,
    mockHourStats,
    mockStateStats,
    mockBlackFridayStats,
    mockByMonth,
    mockByDay
} from './fakeDb';

const API_URL = 'http://localhost:3001/api';

export const handlers = [
    http.get(`${API_URL}/stats/by-device`, () => {
        console.log('[MSW] Intercettato: /stats/by-device');
        return HttpResponse.json(mockDeviceStats);
    }),
    http.get(`${API_URL}/stats/by-hour`, () => {
        console.log('[MSW] Intercettato: /stats/by-hour');
        return HttpResponse.json(mockHourStats);
    }),
    http.get(`${API_URL}/stats/by-state`, () => {
        console.log('[MSW] Intercettato: /stats/by-state');
        return HttpResponse.json(mockStateStats);
    }),
    http.get(`${API_URL}/stats/black-friday`, () => {
        console.log('[MSW] Intercettato: /stats/black-friday');
        return HttpResponse.json(mockBlackFridayStats);
    }),
    http.get(`${API_URL}/stats/by-dow`, () => {
        console.log('[MSW] Intercettato: /stats/by-dow');
        return HttpResponse.json(mockByDay);
    }),
    http.get(`${API_URL}/stats/by-month`, () => {
        console.log('[MSW] Intercettato: /stats/by-month');
        return HttpResponse.json(mockByMonth);
    }),
];