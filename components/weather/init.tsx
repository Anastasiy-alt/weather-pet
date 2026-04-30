'use client'

import { useEffect } from 'react'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useWeatherStore } from '@/store/weather'

export default function WeatherInit() {
    const { coords } = useGeolocation()
    const load = useWeatherStore(s => s.load)
    const weather = useWeatherStore(s => s.weather)

    useEffect(() => {
        if (!coords) return
        if (weather) return
        load(coords.lat, coords.lon).then()
    }, [coords])

    return null
}