import {FastifyPluginAsync} from 'fastify';
import type {
    RawDataQuery,
    RawCountryFilter,
    StatQuery,
    DeviceStat,
    HourStat,
    StateStat,
    YearStat,
    CountryFilter,
    Impression
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
            reply.code(503).send({error: 'Servizio non disponibile, dati in caricamento...'});
            return;
        }
        done();
    });

    // ----------------------------------------------------
    // Endpoint per Dati Grezzi (Paginazione e Filtri)
    // ----------------------------------------------------


    fastify.get<{ Querystring: RawDataQuery }>('/api/impressions',
        async (request) => {
            const {country, page, limit} = request.query;

            // Default e parsing
            const pageNum = parseInt(page || '1', 10);
            const limitNum = parseInt(limit || '100', 10);

            // Filtra
            const filteredData = filterImpressions(allImpressions, country, true);

            // Paginazione
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

    // ----------------------------------------------------
    // Endpoint per Statistiche Aggregate - requisiti
    // ----------------------------------------------------

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

                //(4° Venerdì di Novembre)
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

};

export default apiRoutes;