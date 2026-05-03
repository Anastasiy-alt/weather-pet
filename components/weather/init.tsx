'use client'

import {useEffect} from 'react'
import {useGeolocation} from '@/hooks/useGeolocation'
import {useWeatherStore} from '@/store/weather'
// import {useRouter, useSearchParams} from 'next/navigation'

export default function WeatherInit() {
    const {coords} = useGeolocation()
    const load = useWeatherStore(s => s.load)
    const weather = useWeatherStore(s => s.weather)
    // const router = useRouter()
    // const searchParams = useSearchParams()
    useEffect(() => {
        if (!coords) return
        if (weather) return
        // const params = new URLSearchParams(searchParams.toString())
        // params.set('lat', coords.lat.toString())
        // params.set('lon', coords.lon.toString())
        // router.replace(`?${params.toString()}`)
        load(coords.lat, coords.lon).then()
    }, [coords])

    return null
}