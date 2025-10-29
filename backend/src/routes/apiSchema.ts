const countryQuerySchema = {
    type: 'object',
    properties: {
        country: {
            type: 'string',
            enum: ['all', 'usa', 'no-usa','not-found'],
            default: 'all',
            description: 'result filtred by country'
        }
    }
};

const impressionSchema = {
    type: 'object',
    properties: {
        device_id: {type: 'string'},
        lat: { type: ['number', 'null'] },
        lng: { type: ['number', 'null'] },
        timestamp: {type: 'number'},
        country: {
            type: 'string',
            enum: ['usa', 'no-usa','not-found'],
            description: 'result filtred by country'
        },
        state: { type:['string', 'null'] }

    },
    required: ['device_id', 'lat', 'lng', 'timestamp', 'country', 'state']
}

const deviceStatResponseSchema = {
    200: {
        description: 'Dates device Aggregations',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                device_id: { type: 'string' },
                impressions: { type: 'number' }
            }
        }
    }
}

const hourStatResponseSchema = {
    200:{
        description: 'Dates Hour Aggregations',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                hour: { type: 'number', description: 'hours (0-23)' },
                impressions: { type: 'number' }
            }
        }
    }
}

const dowStatResponseSchema = {
    200: {
        description: 'Counting day of week Aggregations',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                day: { type: 'number', description: 'Days (0-6)' },
                impressions: { type: 'number' }
            }
        }
    }
}

const monthStatResponseSchema = {
    200:{
        description: 'Dates month Aggregations',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                month: { type: 'number', description: 'Month (0-11)' },
                impressions: { type: 'number' }
            }
        }
    }
}

const stateStatResponseSchema = {
    200: {
        description: 'Dates State Aggregations',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                state: {
                    type: 'string',
                    enum: ['all', 'usa', 'no-usa','not-found'],
                    default: 'all',
                    description: 'result filtred by country'
                },
                impressions: { type: 'number' }
            }
        }
    }
}

const yearStatResponseSchema = {
    200: {
        description: 'Dates BlackFriday Aggregations',
        type: 'array',
        items: {
            type: 'object',
            properties: {
                year: { type: 'number', description: 'year' },
                impressions: { type: 'number' }
            }
        }
    }
};

const kpiResponseSchema = {
    200: {
        description: 'Dati KPI aggregati',
        type: 'object',
        properties: {
            totalImpressions: {type: 'number'},
            dailyChangePercent: {type: ['number', 'null']},
            weeklyChangePercent: {type: ['number', 'null']},
            topDevice: {
                type: ['object', 'null'],
                properties: {
                    id: {type: 'string'},
                    impressions: {type: 'number'}
                }
            }
        }
    }
};

const paginatedImpressionsResponseSchema = {
    200: {
        description: 'List paginated of impressions',
        type: 'object',
        properties: {
            totalItems: {type: 'number'},
            totalPages: {type: 'number'},
            currentPage: {type: 'number'},
            data: {
                type: 'array',
                items: impressionSchema
            }
        },
        required: ['totalItems', 'totalPages', 'currentPage', 'data']
    }
};

export {
    deviceStatResponseSchema,
    hourStatResponseSchema,
    monthStatResponseSchema,
    dowStatResponseSchema,
    yearStatResponseSchema,
    stateStatResponseSchema,
    kpiResponseSchema,
    countryQuerySchema,
    paginatedImpressionsResponseSchema
};