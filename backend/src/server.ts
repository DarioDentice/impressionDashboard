import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import {loadData} from './dataLoader.ts';
import type {
    StatQuery,
    RawCountryFilter,
    RawDataQuery,
    DeviceStat,
    HourStat,
    Impression,
    StateStat,
    YearStat,
} from './types.d.ts';

const PORT = 3001;
const server = Fastify({logger: true});

let allImpressions: Impression[] = [];

function filterImpressions(
    country: RawCountryFilter | undefined, // Usa il tipo più ampio
    includeNotFound: boolean = false
): Impression[] {
    let dataToFilter = allImpressions;

    if (!includeNotFound) {
        dataToFilter = dataToFilter.filter((imp) => imp.country !== 'not-found');
    }

    if (!country || country === 'all') {
        return dataToFilter;
    }

    if (country === 'not-found') {
        return dataToFilter.filter((imp) => imp.country === 'not-found');
    }

    const targetCountry = country as 'usa' | 'no-usa';

    if (targetCountry === 'usa' || targetCountry === 'no-usa') {
        return dataToFilter.filter((imp) => imp.country === targetCountry);
    }
    return dataToFilter; // Fallback
}

// ----------------------------------------------------
// Middleware e Dati
// ----------------------------------------------------

server.register(fastifyCors, {
    origin: '*',
});

// Middleware di controllo disponibilità dati
server.addHook('preHandler', (request, reply, done) => {
    if (allImpressions.length === 0) {
        reply.code(503).send({error: 'Servizio non disponibile, dati in caricamento...'});
        return;
    }
    done();
});

// ----------------------------------------------------
// Endpoint per Dati Grezzi (Paginazione e Filtri)
// ----------------------------------------------------

server.get<{
    Querystring: RawDataQuery;
}>('/api/impressions', async (request) => {
    const {country, page, limit} = request.query;

    // Default e parsing
    const pageNum = parseInt(page || '1', 10);
    const limitNum = parseInt(limit || '100', 10);

    // 1. Filtra
    const filteredData = filterImpressions(country, true);

    // 2. Paginazione
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
// Endpoint per Statistiche Aggregate - requisiti della challenge
// ----------------------------------------------------

// 1. Impressioni per dispositivo
server.get<{ Querystring: StatQuery; Reply: DeviceStat[] }>(
    '/api/stats/by-device',
    async (request) => {
        const {country} = request.query;
        const stats = new Map<string, number>();
        const dataToProcess = filterImpressions(country);

        dataToProcess.forEach((imp) => {
            const count = stats.get(imp.device_id) || 0;
            stats.set(imp.device_id, count + 1);
        });

        return Array.from(stats, ([device_id, impressions]) => ({device_id, impressions})).sort(
            (a, b) => b.impressions - a.impressions
        );
    }
);

// 2. Impressioni per ora del giorno
server.get<{ Querystring: StatQuery; Reply: HourStat[] }>('/api/stats/by-hour', async (request) => {
    const hourlyStats: number[] = Array(24).fill(0);
    const {country} = request.query;
    const dataToProcess = filterImpressions(country);

    dataToProcess.forEach((imp) => {
        const date = new Date(imp.timestamp);
        const hour = date.getUTCHours();
        hourlyStats[hour]++;
    });

    return hourlyStats.map((impressions, hour) => ({hour, impressions}));
});

// 3. Impressioni per stato USA
server.get<{ Querystring: StatQuery; Reply: StateStat[] }>(
    '/api/stats/by-state',
    async (request) => {
        const stats = new Map<string, number>();
        const {country} = request.query;
        const dataToProcess = filterImpressions(country);

        dataToProcess.forEach((impression) => {
            if (impression.state) {
                const count = stats.get(impression.state) || 0;
                stats.set(impression.state, count + 1);
            }
        });

        return Array.from(stats, ([state, impressions]) => ({state, impressions}));
    }
);

// 4. Tasso di impressioni del Black Friday
server.get<{ Querystring: StatQuery; Reply: YearStat[] }>(
    '/api/stats/black-friday',
    async (request) => {
        const stats = new Map<number, number>();
        const {country} = request.query;
        const dataToProcess = filterImpressions(country);

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

// ----------------------------------------------------
// Avvio
// ----------------------------------------------------

async function start() {
    try {
        // Carica i dati in memoria PRIMA di avviare il server
        allImpressions = await loadData();

        await server.listen({port: PORT, host: '0.0.0.0'});
        console.log(`Server Fastify in esecuzione su http://localhost:${PORT}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}

start();
