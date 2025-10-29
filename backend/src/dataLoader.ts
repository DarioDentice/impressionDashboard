import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as turf from '@turf/turf';
import type {Impression} from './types.d.ts';

const CSV_FILE_PATH = path.join(process.cwd(), './src/data/impressions.csv');
const MAP_FILE_PATH = path.join(process.cwd(), './src/data/map.json');

const mapFeatures = JSON.parse(fs.readFileSync(MAP_FILE_PATH, 'utf-8')).features;

function getGeoData(
    lat: string,
    lng: string
): { country: 'usa' | 'no-usa' | 'not-found'; state: string | null } {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
        console.warn(`getGeoData: invalid coordinates detected (Lat: ${lat}, Lng: ${lng}).`);
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
        return {country: 'not-found', state: null};
    }
    return {country: 'no-usa', state: null};
}

/**
 * Loads and processes the CSV in memory.
 * @returns A promise that resolves to the full impression array.
 */
export function loadData(): Promise<Impression[]> {
    return new Promise((resolve, reject) => {
        console.log('Starting CSV loading into memory...');
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
                console.log(`Data uploaded: ${results.length} impressions on Memory.`);
                resolve(results);
            })
            .on('error', (error) => {
                console.error('Error reading CSV:', error);
                reject(error);
            });
    });
}
