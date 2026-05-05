// store/geolocation.ts
import { create } from 'zustand'

type Coords = { lat: number; lon: number }

interface GeoStore {
    coords: Coords | null
    currentCoords: Coords | null
    error: string | null
    initialized: boolean
    init: () => void
    setLocation: (c: Coords) => void
    reset: () => void
}

const FALLBACK_CITIES = [
    {lat: 56.946, lon: 24.105, name: "Рига"},
    {lat: 55.7558, lon: 37.6173, name: "Москва"},
    {lat: 59.9343, lon: 30.3351, name: "Санкт-Петербург"},
    {lat: 48.8566, lon: 2.3522, name: "Париж"},
    {lat: 51.5074, lon: -0.1278, name: "Лондон"},
    {lat: 40.7128, lon: -74.0060, name: "Нью-Йорк"},
    {lat: 34.0522, lon: -118.2437, name: "Лос-Анджелес"},
    {lat: 35.6895, lon: 139.6917, name: "Токио"},
    {lat: 52.5200, lon: 13.4050, name: "Берлин"},
    {lat: 41.9028, lon: 12.4964, name: "Рим"},
    {lat: 55.9533, lon: -3.1883, name: "Эдинбург"},
    {lat: 37.7749, lon: -122.4194, name: "Сан-Франциско"},
    {lat: 45.4654, lon: 9.1859, name: "Милан"},
    {lat: 39.9042, lon: 116.4074, name: "Пекин"},
    {lat: 50.0755, lon: 14.4378, name: "Прага"},
]

export const useGeoStore = create<GeoStore>((set, get) => ({
    coords: typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('coords') || 'null')
        : null,
    currentCoords: null,
    error: null,
    initialized: false,

    init: () => {
        // if (get().initialized) return  // ← уже инициализировано — не запрашиваем снова
        // set({ initialized: true })

        if (!navigator.geolocation) {
            // fallback
            return
        }

        navigator.permissions.query({ name: 'geolocation' }).then(result => {
            if (result.state === 'denied') {
                // fallback
                return
            }

            if (result.state === 'prompt' && get().coords) {
                return
            }

            navigator.geolocation.getCurrentPosition(
                pos => {
                    const c = { lat: pos.coords.latitude, lon: pos.coords.longitude }
                    set({ currentCoords: c })
                    if (!get().coords) {
                        localStorage.setItem('coords', JSON.stringify(c))
                        set({ coords: c })
                    }
                },
                () => {
                    const city = FALLBACK_CITIES[Math.floor(Math.random() * FALLBACK_CITIES.length)]
                    set({ currentCoords: city, coords: city, error: 'Геолокация недоступна' })
                }
            )
        })
    },

    setLocation: (c) => {
        localStorage.setItem('coords', JSON.stringify(c))
        set({ coords: c })
    },

    reset: () => {
        const { currentCoords, setLocation } = get()
        if (currentCoords) {
            setLocation(currentCoords)
        }
    }
}))