import { create } from 'zustand'
import { fetchWeather } from '@/lib/weather'
import { fetchLocation } from '@/lib/location'
import type { Weather } from '@/types/weather'
import type { Location } from '@/types/location'

interface Coords {
    lat: number
    lon: number
}

interface WeatherState {
    coords: Coords | null
    weather: Weather | null
    location: Location | null
    loading: boolean
    error: string | null
}

interface WeatherActions {
    load: (lat: number, lon: number) => Promise<void>
    refresh: () => Promise<void>
}

export const useWeatherStore = create<WeatherState & WeatherActions>((set, get) => ({
    coords: null,
    weather: null,
    location: null,
    loading: false,
    error: null,

    load: async (lat, lon) => {
        set({ coords: { lat, lon }, loading: true, error: null, weather: null, location: null })
        try {
            const [weather, location] = await Promise.all([
                fetchWeather(lat, lon),
                fetchLocation(lat, lon),
            ])
            set({ weather, location, loading: false })
        } catch (err) {
            set({
                loading: false,
                error: err instanceof Error ? err.message : 'Ошибка загрузки',
            })
        }
    },

    refresh: async () => {
        const { coords, load } = get()
        if (!coords) return
        await load(coords.lat, coords.lon)
    },
}))