import Fastify, {FastifyInstance} from 'fastify';
import fastifyCors from '@fastify/cors';
import {loadData} from './dataLoader.ts';
import type {
    Impression
} from './types.d.ts';
import apiRoutes from './routes/apiRoutes.ts';

const PORT = 3001;


function createServer(loadedData: Impression[]): FastifyInstance {
    const server = Fastify({logger: false});
    server.register(fastifyCors, {origin: '*'});
    server.register(apiRoutes, {
        allImpressions: loadedData
    });

    return server;
}

export async function startServer(): Promise<FastifyInstance> {
    const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST;
    try {
        const allImpressions = await loadData();
        const server = createServer(allImpressions);
        if (!isTest) {
            console.log('[Server Start]');
            await server.listen({port: PORT, host: '0.0.0.0'});
            console.log(`Fastify server running on http://localhost:${PORT}`);
        } else {
            console.log('[Server Test Start]');
            await server.ready();
        }
        return server;
    } catch (err) {
        if (!isTest) {
            console.error('FATAL ERROR: Unable to load data.', err);
            process.exit(1);
        }
        throw err;
    }
}

if (!process.env.VITEST) {
    startServer();
}
