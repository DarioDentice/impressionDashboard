import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "~": path.resolve(__dirname, "src"),
        },
    },
    build: {
        rolldownOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('chart.js')) {
                            return 'vendor-chartjs';
                        }
                        if (id.includes('react-router-dom') || id.includes('react-router')) {
                            return 'vendor-router';
                        }
                        if (id.includes('react-dom') || id.includes('react')) {
                            return 'vendor-react';
                        }
                        return 'vendor-common';
                    }
                },
            },
        },
    },
});

