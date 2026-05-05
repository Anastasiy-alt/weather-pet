'use client'

import {useEffect} from 'react'
import {useGeolocation} from '@/hooks/useGeolocation'
import {useWeatherStore} from '@/store/weather'
import {useGeoStore} from "@/store/geolocation";

export default function WeatherInit() {
    // const {coords} = useGeolocation()
    const { coords, init } = useGeoStore()
    const load = useWeatherStore(s => s.load)
    const weather = useWeatherStore(s => s.weather)
    useEffect(() => {
        init()  // вызывается каждый раз но внутри проверяет initialized
    }, [])

    useEffect(() => {
        if (!coords || weather) return
        load(coords.lat, coords.lon).then()
    }, [coords])

    return null
}