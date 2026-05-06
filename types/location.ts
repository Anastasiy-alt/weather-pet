interface Timezone {
    name: string
    offset_STD: string
    offset_STD_seconds: number
    offset_DST: string
    offset_DST_seconds: number
}

interface Rank {
    importance: number
    popularity: number
}

interface Datasource {
    sourcename: string
    attribution: string
    license: string
    url: string
}

interface FeatureProperties {
    datasource: Datasource
    country: string
    country_code: string
    region?: string
    state?: string
    county: string
    city: string
    postcode?: string
    suburb?: string
    street?: string
    housenumber?: string
    iso3166_2?: string
    lon: number
    lat: number
    distance: number
    result_type: string
    formatted: string
    address_line1: string
    address_line2: string
    category?: string
    timezone: Timezone
    plus_code?: string
    rank: Rank
    place_id: string
}

interface FeatureGeometry {
    type: 'Point'
    coordinates: number[]
}

interface Feature {
    type: 'Feature'
    properties: FeatureProperties
    geometry: FeatureGeometry
    bbox?: number[]
}

interface Query {
    lat: number
    lon: number
    plus_code?: string
}

export interface Location {
    type: 'FeatureCollection'
    features: Feature[]
    query: Query
}