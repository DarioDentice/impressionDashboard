import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as turf from '@turf/turf';
import type {Impression} from './types.d.ts';

const CSV_FILE_PATH = path.join(process.cwd(), './src/data/impressions.csv');
const MAP_FILE_PATH = path.join(process.cwd(), './src/data/map.json');

const mapFeatures = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf-8')).features;

// Funzione helper per determinare lo stato USA
function getGeoData(
    lat: string,
    lng: string
): { country: 'usa' | 'no-usa' | 'not-found'; state: string | null } {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
        console.warn(`getGeoData: Coordinate non valide rilevate (Lat: ${lat}, Lng: ${lng}).`);
        return {country: 'not-found', state: null};
    }
    try {
        const point = turf.point([parseFloat(lng), parseFloat(lat)]);
        for (const feature of mapFeatures) {
            if (turf.booleanPointInPolygon(point, feature.geometry as any)) {
                return {country: 'usa', state: feature.properties.name || null};
            }
        }
    } catch (e) {
        return {country: 'not-found', state: null}; // Non trovato
    }
    return {country: 'no-usa', state: null}; // Non trovato negli USA
}

/**
 * Carica e processa il CSV in memoria.
 * @returns Promise che si risolve con l'array completo di impression.
 */
export function loadData(): Promise<Impression[]> {
    return new Promise((resolve, reject) => {
        console.log('Avvio caricamento CSV in memoria...');
        const results: Impression[] = [];

        fs.createReadStream(CSV_FILE_PATH)
            .pipe(csv())
            .on('data', (row: { [key: string]: string }) => {
                const timestamp = parseInt(row.timestamp, 10);
                const geo = getGeoData(row.lat, row.lng);
                results.push({
                    device_id: row.device_id,
                    lat: parseFloat(row.lat),
                    lng: parseFloat(row.lng),
                    timestamp: timestamp,
                    country: geo.country,
                    state: geo.state,
                });
            })
            .on('end', () => {
                console.log(`Dati caricati: ${results.length} impressioni in RAM.`);
                resolve(results);
            })
            .on('error', (error) => {
                console.error('Errore durante la lettura del CSV:', error);
                reject(error);
            });
    });
}
