import {http, HttpResponse} from 'msw';
import {
    mockDeviceStats,
    mockHourStats,
    mockStateStats,
    mockBlackFridayStats,
    mockByMonth,
    mockByDay,
    mockPaginatedImpressions,
    mockOverview
} from './fakeDb';

const API_URL = 'http://localhost:3001/api';

export const handlers = [
    http.get(`${API_URL}/stats/by-device`, () => {
        console.log('[MSW] catchBy: /stats/by-device');
        return HttpResponse.json(mockDeviceStats);
    }),
    http.get(`${API_URL}/stats/by-hour`, () => {
        console.log('[MSW] catchBy: /stats/by-hour');
        return HttpResponse.json(mockHourStats);
    }),
    http.get(`${API_URL}/stats/by-state`, () => {
        console.log('[MSW] catchBy: /stats/by-state');
        return HttpResponse.json(mockStateStats);
    }),
    http.get(`${API_URL}/stats/black-friday`, () => {
        console.log('[MSW] catchBy: /stats/black-friday');
        return HttpResponse.json(mockBlackFridayStats);
    }),
    http.get(`${API_URL}/stats/by-dow`, () => {
        console.log('[MSW] catchBy: /stats/by-dow');
        return HttpResponse.json(mockByDay);
    }),
    http.get(`${API_URL}/stats/by-month`, () => {
        console.log('[MSW] catchBy: /stats/by-month');
        return HttpResponse.json(mockByMonth);
    }),
    http.get(`${API_URL}/impressions`, () => {
        console.log('[MSW] catchBy: /impressions');
        return HttpResponse.json(mockPaginatedImpressions);
    }),
    http.get(`${API_URL}/stats/kpi`, ({}) => {
        console.log('[MSW] catchBy: /stats/kpi');
        return HttpResponse.json(mockOverview);
    })
];

