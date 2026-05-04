import {resolveSrv} from "node:dns";

export interface CityResult {
    address_line1: string
    address_line2: string
    bbox: { lon1: 37.290502, lat1: 55.516684, lon2: 37.9674277, lat2: 55.9577717 }
    category: string
    city: string
    country: string
    country_code: string
    formatted: string
    iso3166_2: string
    lat: number
    lon: number
    place_id: string
    region: string
    result_type: string
    state: string
    timezone:
        {
            name: string
            offset_STD: string
            offset_STD_seconds: number
            offset_DST: string
            offset_DST_seconds: number
        }
}