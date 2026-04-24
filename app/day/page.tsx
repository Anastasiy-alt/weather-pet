'use client'

import { useWeatherStore } from '@/store/weather'
import Loader from "@/components/ui/loader";

export default function DayPage() {
    const { weather, location, loading } = useWeatherStore()

    if (loading || !weather || !location) return <Loader />

    return (
        <div>
            <h1>{location.city}</h1>
            {weather.days.map(day => (
                <div key={day.datetime}>
                    {day.datetime} — {day.temp}°
                </div>
            ))}
        </div>
    )
}