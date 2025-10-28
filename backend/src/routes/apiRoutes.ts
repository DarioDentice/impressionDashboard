import {FastifyPluginAsync} from 'fastify';
import type {
    CountryFilter,
    DeviceStat,
    HourStat,
    Impression,
    RawCountryFilter,
    RawDataQuery,
    StateStat,
    StatQuery,
    YearStat,
    KpiData
} from '../types.d.ts';

interface RouteOptions {
    allImpressions: Impression[];
}

function filterImpressions(
    allImpressions: Impression[],
    country: RawCountryFilter | CountryFilter | undefined,
    includeNotFound: boolean = false
): Impression[] {

    let dataToFilter = allImpressions;
    if (!includeNotFound) {
        dataToFilter = dataToFilter.filter(imp => imp.country !== 'not-found');
    }

    if (!country || country === 'all') {
        return dataToFilter;
    }
    if (country === 'not-found') {
        return dataToFilter.filter(imp => imp.country === 'not-found');
    }
    const targetCountry = country as 'usa' | 'no-usa';
    if (targetCountry === 'usa' || targetCountry === 'no-usa') {
        return dataToFilter.filter(imp => imp.country === targetCountry);
    }
    return dataToFilter;
}

const apiRoutes: FastifyPluginAsync<RouteOptions> = async (fastify, options) => {

    const allImpressions = options.allImpressions;

    fastify.addHook('preHandler', (
        request,
        reply,
        done) => {
        if (allImpressions.length === 0) {
            reply.code(503).send({error: 'Service unavailable, data loading...'});
            return;
        }
        done();
    });

    fastify.get<{ Querystring: RawDataQuery }>('/api/impressions',
        async (request) => {
            const {country, page, limit} = request.query;

            const pageNum = parseInt(page || '1', 10);
            const limitNum = parseInt(limit || '100', 10);

            const filteredData = filterImpressions(allImpressions, country, true);

            const startIndex = (pageNum - 1) * limitNum;
            const endIndex = pageNum * limitNum;
            const results = filteredData.slice(startIndex, endIndex);

            return {
                totalItems: filteredData.length,
                totalPages: Math.ceil(filteredData.length / limitNum),
                currentPage: pageNum,
                data: results,
            };
        });


    // How many impressions are coming from each device?
    fastify.get<{ Querystring: StatQuery; Reply: DeviceStat[] }>(
        '/api/stats/by-device',
        async (request) => {
            const {country} = request.query;
            const stats = new Map<string, number>();
            const dataToProcess = filterImpressions(allImpressions, country, true);

            dataToProcess.forEach((imp) => {
                const count = stats.get(imp.device_id) || 0;
                stats.set(imp.device_id, count + 1);
            });

            return Array.from(stats, ([device_id, impressions]) => ({device_id, impressions})).sort(
                (a, b) => b.impressions - a.impressions
            );
        }
    );

    //How many impressions for each hour of the day?
    fastify.get<{ Querystring: StatQuery; Reply: HourStat[] }>('/api/stats/by-hour', async (request) => {
        const hourlyStats: number[] = Array(24).fill(0);
        const {country} = request.query;
        const dataToProcess = filterImpressions(allImpressions, country, true);

        dataToProcess.forEach((imp) => {
            const date = new Date(imp.timestamp);
            const hour = date.getUTCHours();
            hourlyStats[hour]++;
        });

        return hourlyStats.map((impressions, hour) => ({hour, impressions}));
    });

    //How many impressions for each US state?
    fastify.get<{ Querystring: StatQuery; Reply: StateStat[] }>(
        '/api/stats/by-state',
        async (request) => {
            const stats = new Map<string, number>();
            const {country} = request.query;
            const dataToProcess = filterImpressions(allImpressions, country, true);

            dataToProcess.forEach((impression) => {
                if (impression.state) {
                    const count = stats.get(impression.state) || 0;
                    stats.set(impression.state, count + 1);
                }
            });

            return Array.from(stats, ([state, impressions]) => ({state, impressions}));
        }
    );

    //Black friday impression rate through the years
    fastify.get<{ Querystring: StatQuery; Reply: YearStat[] }>(
        '/api/stats/black-friday',
        async (request) => {
            const stats = new Map<number, number>();
            const {country} = request.query;
            const dataToProcess = filterImpressions(allImpressions, country, true);

            dataToProcess.forEach((imp) => {
                const date = new Date(imp.timestamp);
                const month = date.getMonth();
                const day = date.getDate();
                const dayOfWeek = date.getDay();
                const year = date.getFullYear();

                if (month === 10 && dayOfWeek === 5 && day >= 22 && day <= 28) {
                    const count = stats.get(year) || 0;
                    stats.set(year, count + 1);
                }
            });

            return Array.from(stats, ([year, impressions]) => ({year, impressions})).sort(
                (a, b) => a.year - b.year
            );
        }
    );

    fastify.get<{ Querystring: StatQuery, Reply: any[] }>('/api/stats/by-dow', async (request) => {
        // Esclude 'not-found' di default
        const dataToProcess = filterImpressions(allImpressions, request.query.country, false);

        const dowStats = Array(7).fill(0);

        dataToProcess.forEach(imp => {
            const dow = new Date(imp.timestamp).getUTCDay();
            dowStats[dow]++;
        });

        return dowStats.map((impressions, day) => ({day, impressions}));
    });

    fastify.get<{ Querystring: StatQuery, Reply: any[] }>('/api/stats/by-month', async (request) => {
        const dataToProcess = filterImpressions(allImpressions, request.query.country, false);

        const monthStats = Array(12).fill(0);

        dataToProcess.forEach(imp => {
            const month = new Date(imp.timestamp).getUTCMonth();
            monthStats[month]++;
        });

        return monthStats.map((impressions, month) => ({month, impressions}));
    });

    // EXTRA - create a response with kpi stats
    fastify.get<{ Querystring: StatQuery, Reply: KpiData }>('/api/stats/kpi', async (request) => {

        const cleanData = filterImpressions(allImpressions, request.query.country, false);

        if (cleanData.length === 0) {
            return { totalImpressions: 0, dailyChangePercent: 0, weeklyChangePercent: 0, topDevice: null };
        }

        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const yesterdayStart = new Date(new Date().setDate(todayStart.getDate() - 1));
        const lastMonthStart = new Date(new Date().setDate(todayStart.getDate() - 6));
        const prev2MonthStart = new Date(new Date().setDate(todayStart.getDate() - 13));

        const impressionsToday = cleanData.filter(imp => imp.timestamp >= todayStart.getTime()).length;
        const impressionsYesterday = cleanData.filter(imp => imp.timestamp >= yesterdayStart.getTime() && imp.timestamp < todayStart.getTime()).length;

        const impressionsLast7Days = cleanData.filter(imp => imp.timestamp >= lastMonthStart.getTime()).length;
        const impressionsPrev7Days = cleanData.filter(imp => imp.timestamp >= prev2MonthStart.getTime() && imp.timestamp < lastMonthStart.getTime()).length;

        const calcPercent = (current: number, previous: number): number | null => {
            if (previous === 0) {
                return (current > 0 ? 100.0 : 0.0);
            }
            if (current === 0 && previous === 0) return 0.0;
            return ((current - previous) / previous) * 100;
        };
        const dailyChange = calcPercent(impressionsToday, impressionsYesterday);
        const weeklyChange = calcPercent(impressionsLast7Days, impressionsPrev7Days);
        const deviceMap = new Map<string, number>();
        cleanData.forEach(imp => {
            deviceMap.set(imp.device_id, (deviceMap.get(imp.device_id) || 0) + 1);
        });

        let topDeviceEntry = null;
        if (deviceMap.size > 0) {
            topDeviceEntry = [...deviceMap.entries()].reduce(
                (a, b) => b[1] > a[1] ? b : a);
        }
        return {
            totalImpressions: cleanData.length,
            dailyChangePercent: dailyChange,
            weeklyChangePercent: weeklyChange,
            topDevice: topDeviceEntry ? { id: topDeviceEntry[0], impressions: topDeviceEntry[1] } : null
        };
    });

};

export default apiRoutes;