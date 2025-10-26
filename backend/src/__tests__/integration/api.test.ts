import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest';
import supertest from 'supertest';
import {FastifyInstance} from 'fastify';
import {startServer} from '../../server.ts';
import COMPLETE_MOCK_DATA from '../mockData.ts';
import type {DeviceStat,HourStat,StateStat,YearStat} from '../../types.d.ts'

type SuperTestInstance = ReturnType<typeof supertest>;

vi.mock('../../dataLoader', () => ({
    loadData: vi.fn(() => {
        console.log('--- MOCK DI LOAD_DATA ATTIVO ---');
        return Promise.resolve(COMPLETE_MOCK_DATA);
    }),
}));

let server: FastifyInstance;
let api: SuperTestInstance;

beforeAll(async () => {
    server = await startServer();
    api = supertest(server.server);
});

afterAll(async () => {
    await server.close();
});

describe('GET /api/impressions (Raw Data & Debug)', () => {

    // Test A.1: Nessun filtro (default: 'all')
    it('should return all 8 items when no country filter is provided', async () => {
        const response = await api.get('/api/impressions?limit=10').expect(200);
        expect(response.body.totalItems).toBe(8);
        expect(response.body.data).toHaveLength(8);
        expect(response.body.data.some((d: any) => d.country === 'not-found')).toBe(true);
    });

    // Test A.2: Filtro esplicito usa
    it('should return 4 USA items', async () => {
        const response = await api.get('/api/impressions?country=usa').expect(200);
        expect(response.body.totalItems).toBe(4);
        expect(response.body.data.every((d: any) => d.country === 'usa')).toBe(true);
    });

    // Test A.3: Filtro esplicito not-found (Debugging)
    it('should return 2 NOT-FOUND items', async () => {
        const response = await api.get('/api/impressions?country=not-found').expect(200);
        expect(response.body.totalItems).toBe(2);
        expect(response.body.data.every((d: any) => d.country === 'not-found')).toBe(true);
    });
});

describe('GET /api/stats/by-device', () => {

    it('should exclude NOT-FOUND and aggregate ALL clean data (country=all)', async () => {
        const response = await api.get('/api/stats/by-device?country=all').expect(200);

        expect(response.body).toHaveLength(6);

        const devNy = response.body.find((elem: DeviceStat) => elem.device_id === 'DEV_NY_1');
        const devInt = response.body.find((elem: DeviceStat) => elem.device_id === 'INT_1');

        expect(devNy?.impressions).toBe(2);
        expect(devInt?.impressions).toBe(2);
    });

    it('should aggregate only USA data (country=usa)', async () => {
        const response = await api.get('/api/stats/by-device?country=usa').expect(200);

        expect(response.body).toHaveLength(3);
        const devNy = response.body.find((elem: DeviceStat) => elem.device_id === 'DEV_NY_1');
        expect(devNy?.impressions).toBe(2);
    });

    it('should aggregate only NO-USA data (country=no-usa)', async () => {
        const response = await api.get('/api/stats/by-device?country=no-usa').expect(200);

        expect(response.body).toHaveLength(1);
        expect(response.body[0].device_id).toBe('INT_1');
        expect(response.body[0].impressions).toBe(2);
    });
});

// =========================================================================

describe('GET /api/stats/by-hour', () => {

    it('should return hourly counts for ALL clean data (country=all)', async () => {
        const response = await api.get('/api/stats/by-hour?country=all').expect(200);

        const hour0 = response.body.find((elem: HourStat) => elem.hour === 0);
        const hour1 = response.body.find((elem: HourStat) => elem.hour === 1);
        const hour2 = response.body.find((elem: HourStat) => elem.hour === 2);
        const hour12 = response.body.find((elem: HourStat) => elem.hour === 12);
        const hour10 = response.body.find((elem: HourStat) => elem.hour === 10);

        expect(hour0?.impressions).toBe(3);
        expect(hour1?.impressions).toBe(1);
        expect(hour2?.impressions).toBe(1);
        expect(hour12?.impressions).toBe(1);
        expect(hour10?.impressions).toBe(0);
    });
});

// =========================================================================

describe('GET /api/stats/by-state', () => {

    it('should only count USA data and exclude NOT-FOUND', async () => {
        const response = await api.get('/api/stats/by-state').expect(200);

        expect(response.body).toHaveLength(3);

        const newYork = response.body.find((elem:StateStat) => elem.state === 'New York');
        const alabama = response.body.find((elem:StateStat) => elem.state === 'Alabama');
        const alaska = response.body.find((elem:StateStat) => elem.state === 'Alaska');

        expect(newYork?.impressions).toBe(2);
        expect(alabama?.impressions).toBe(1);
        expect(alaska?.impressions).toBe(1);
    });

    it('should return an empty array if filtered for no-usa', async () => {
        const response = await api.get('/api/stats/by-state?country=no-usa').expect(200);
        expect(response.body).toHaveLength(0);
    });
});

// =========================================================================

describe('GET /api/stats/black-friday', () => {

    it('should find the 1 Black Friday event (2023)', async () => {
        const response = await api.get('/api/stats/black-friday').expect(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].year).toBe(2023);
        expect(response.body[0].impressions).toBe(1);
    });

    it('should return empty if filtered for a year with no Black Friday events', async () => {
        const response = await api.get('/api/stats/black-friday?country=all').expect(200);
        expect(response.body.find((elem: YearStat) => elem.year === 2024)).toBeUndefined();
    });
});