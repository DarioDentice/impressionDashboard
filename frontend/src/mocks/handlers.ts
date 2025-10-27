import {http, HttpResponse} from 'msw';
import {mockImpressions} from './fakeDb';
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
];

http.get(`${API_URL}/kpi/overview`, ({request}) => {
    const url = new URL(request.url);

    const countryFilter = url.searchParams.get('country') || 'all';

    const filteredImpressions = mockImpressions.filter(imp => {
        if (countryFilter === 'all') return true;
        if (countryFilter === 'usa') return imp.country === 'USA';
        if (countryFilter === 'no-usa') return imp.country === 'no-usa';
        return false;
    });

    const mockToday = new Date('2023-11-22T12:00:00Z');
    const todayStart = new Date(mockToday.setHours(0, 0, 0, 0));
    const yesterdayStart = new Date(todayStart.getTime() - (24 * 60 * 60 * 1000));
    const last7DaysStart = new Date(todayStart.getTime() - (6 * 24 * 60 * 60 * 1000));
    const prev7DaysStart = new Date(last7DaysStart.getTime() - (7 * 24 * 60 * 60 * 1000));

    const impressionsToday = filteredImpressions.filter(imp => imp.timestamp >= todayStart.getTime()).length;
    const impressionsYesterday = filteredImpressions.filter(imp => imp.timestamp >= yesterdayStart.getTime() && imp.timestamp < todayStart.getTime()).length;
    const impressionsLast7Days = filteredImpressions.filter(imp => imp.timestamp >= last7DaysStart.getTime()).length;
    const impressionsPrev7Days = filteredImpressions.filter(imp => imp.timestamp >= prev7DaysStart.getTime() && imp.timestamp < last7DaysStart.getTime()).length;

    const calcPercent = (current: number, previous: number): number | null => {
        if (previous === 0) return (current > 0 ? 100.0 : 0.0);
        if (current === 0 && previous === 0) return 0.0;
        return ((current - previous) / previous) * 100;
    };

    const dailyChange = calcPercent(impressionsToday, impressionsYesterday);
    const weeklyChange = calcPercent(impressionsLast7Days, impressionsPrev7Days);

    const deviceMap = new Map<string, number>();
    filteredImpressions.forEach(imp => {
        deviceMap.set(imp.device_id, (deviceMap.get(imp.device_id) || 0) + 1);
    });
    let topDeviceEntry = null;
    if (deviceMap.size > 0) {
        topDeviceEntry = [...deviceMap.entries()].reduce((a, b) => b[1] > a[1] ? b : a);
    }

    return HttpResponse.json({
        totalImpressions: filteredImpressions.length,
        dailyChangePercent: dailyChange,
        weeklyChangePercent: weeklyChange,
        topDevice: topDeviceEntry ? {id: topDeviceEntry[0], impressions: topDeviceEntry[1]} : null
    });
})