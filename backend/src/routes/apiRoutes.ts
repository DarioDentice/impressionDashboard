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
    YearlyTrend,
    KpiData,
    SortKeys
} from '../types.d.ts';
import {
    countryQuerySchema,
    kpiResponseSchema,
    deviceStatResponseSchema,
    hourStatResponseSchema,
    monthStatResponseSchema,
    stateStatResponseSchema,
    yearStatResponseSchema,
    dowStatResponseSchema,
} from './apiSchema'

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

    fastify.get<{ Querystring: RawDataQuery }>('/api/impressions', {
        schema: {
            summary: 'Raw Impressions Data',
            description: 'Return all data',
            tags: ['Data'],
            querystring: {
                type: 'object',
                properties: {
                    country: {type: 'string', enum: ['all', 'usa', 'no-usa', 'not-found']},
                    page: {type: 'string', default: '1'},
                    limit: {type: 'string', default: '10'},
                    sortBy: {type: 'string', enum: ['device_id', 'timestamp', 'country', 'state']},
                    sortOrder: {type: 'string', enum: ['asc', 'desc']}
                },
            },
        }
    }, async (request) => {
        const {country, page, limit, sortBy, sortOrder} = request.query;
        const pageNum = parseInt(page || '1', 10);
        const limitNum = parseInt(limit || '100', 10);

        const filteredData = filterImpressions(allImpressions, country, true);

        if (sortBy && sortOrder) {
            const key = sortBy as SortKeys;

            filteredData.sort((elemA, elemB) => {
                const impressionA = elemA[key];
                const impressionB = elemB[key];
                if (impressionA === null) return 1;
                if (impressionB === null) return -1;
                let compare = 0;
                if (typeof impressionA === 'number' && typeof impressionB === 'number') {
                    compare = impressionA - impressionB;
                } else if (typeof impressionA === 'string' && typeof impressionB === 'string') {
                    compare = impressionA.localeCompare(impressionB);
                }
                return sortOrder === 'asc' ? compare : -compare;
            });
        }

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
        '/api/stats/by-device', {
            schema: {
                summary: 'ByDevice',
                description: 'Return impressions by device',
                tags: ['device'],
                querystring: countryQuerySchema,
                response: deviceStatResponseSchema
            }
        },
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
    fastify.get<{ Querystring: StatQuery; Reply: HourStat[] }>('/api/stats/by-hour', {
        schema: {
            summary: 'ByHour',
            description: 'Return impressions by Hour',
            tags: ['hour'],
            querystring: countryQuerySchema,
            response: hourStatResponseSchema
        }
    }, async (request) => {
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
        {
            schema: {
                summary: 'byState',
                description: 'Return impressions by State',
                tags: ['state'],
                querystring: countryQuerySchema,
                response: stateStatResponseSchema
            }
        },
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

    //Blackfriday impression rate through the years
    fastify.get<{ Querystring: StatQuery; Reply: YearStat[] }>(
        '/api/stats/black-friday', {
            schema: {
                summary: 'blackFriday',
                description: 'Return impressions by year during the blackFriday',
                tags: ['blackFriday'],
                querystring: countryQuerySchema,
                response: yearStatResponseSchema
            }
        },
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

    fastify.get<{ Querystring: StatQuery, Reply: any[] }>('/api/stats/by-dow',
        {
            schema: {
                summary: 'Day of Week impressions',
                description: 'Return impressions by day of Week',
                tags: ['hour'],
                querystring: countryQuerySchema,
                response: dowStatResponseSchema
            }
        }, async (request) => {

            const dataToProcess = filterImpressions(allImpressions, request.query.country, false);

            const dowStats = Array(7).fill(0);

            dataToProcess.forEach(imp => {
                const dow = new Date(imp.timestamp).getUTCDay();
                dowStats[dow]++;
            });

            return dowStats.map((impressions, day) => ({day, impressions}));
        });

    fastify.get<{ Querystring: StatQuery, Reply: any[] }>('/api/stats/by-month',
        {
            schema: {
                summary: 'Month impressions',
                description: 'Return impressions by month',
                tags: ['hour'],
                querystring: countryQuerySchema,
                response: monthStatResponseSchema
            }
        }, async (request) => {
            const dataToProcess = filterImpressions(allImpressions, request.query.country, false);

            const monthStats = Array(12).fill(0);

            dataToProcess.forEach(imp => {
                const month = new Date(imp.timestamp).getUTCMonth();
                monthStats[month]++;
            });

            return monthStats.map((impressions, month) => ({month, impressions}));
        });

    // EXTRA - create a response with kpi stats
    fastify.get<{ Querystring: StatQuery, Reply: KpiData }>(
        '/api/stats/kpi',
        {
            schema: {
                summary: 'KPI Overview with Yearly Trends',
                description: 'Returns key KPIs including year-over-year trends (2010-2018).',
                tags: ['KPI'],
                querystring: countryQuerySchema,
                response: kpiResponseSchema
            }
        },
        async (request) => {
            const cleanData = filterImpressions(allImpressions, request.query.country, false);

            if (cleanData.length === 0) {
                return { totalImpressions: 0, yearlyTrends: [], topDevice: null };
            }

            const impressionsByYear: { [year: number]: number } = {};
            const years = Array.from({ length: 9 }, (_, i) => 2010 + i); // 2010 to 2018

            years.forEach(year => impressionsByYear[year] = 0); // Initialize

            cleanData.forEach(imp => {
                const year = new Date(imp.timestamp).getFullYear();
                if (impressionsByYear.hasOwnProperty(year)) {
                    impressionsByYear[year]++;
                }
            });

            const yearlyTrends: YearlyTrend[] = [];
            const calcPercent = (current: number, previous: number): number | null => {
                if (previous === 0) return (current > 0 ? 100.0 : 0.0);
                if (current === 0 && previous === 0) return 0.0;
                return ((current - previous) / previous) * 100;
            };

            for (let i = 0; i < years.length; i++) {
                const currentYear = years[i];
                const currentImpressions = impressionsByYear[currentYear];
                let changePercent: number | null = null;

                if (i > 0) {
                    const previousYear = years[i - 1];
                    const previousImpressions = impressionsByYear[previousYear];
                    changePercent = calcPercent(currentImpressions, previousImpressions);
                }

                yearlyTrends.push({
                    year: currentYear,
                    impressions: currentImpressions,
                    changePercent: changePercent !== null ? parseFloat(changePercent.toFixed(1)) : null
                });
            }

            const deviceMap = new Map<string, number>();
            cleanData.forEach(imp => {
                deviceMap.set(imp.device_id, (deviceMap.get(imp.device_id) || 0) + 1);
            });
            let topDeviceEntry = null;
            if (deviceMap.size > 0) {
                topDeviceEntry = [...deviceMap.entries()].reduce(
                    (a, b) => b[1] > a[1] ? b : a);
            }
            console.log(yearlyTrends);
            return {
                totalImpressions: cleanData.length,
                yearlyTrends: yearlyTrends,
                topDevice: topDeviceEntry ? { id: topDeviceEntry[0], impressions: topDeviceEntry[1] } : null
            };
        }
    );

};

export default apiRoutes;