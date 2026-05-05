'use client'

import {useEffect} from 'react'
import {useWeatherStore} from '@/store/weather'
import {useGeoStore} from "@/store/geolocation";

export default function WeatherInit() {
    const { coords, init } = useGeoStore()
    const load = useWeatherStore(s => s.load)
    const weather = useWeatherStore(s => s.weather)
    useEffect(() => {
        init()
    }, [])

    useEffect(() => {
        if (!coords || weather) return
        load(coords.lat, coords.lon).then()
    }, [coords])

    return null
}