'use client'
import {useWeatherStore} from '@/store/weather'
import Loader from "@/components/ui/loader";
import DayCard from "@/components/cards/day";
import stl from './day.module.sass'

export default function DayPage() {
    const {weather, location, loading} = useWeatherStore()

    if (loading || !weather || !location) return <Loader/>
    const globalMin = Math.min(...weather.days.map(d => d.tempmin))
    const globalMax = Math.max(...weather.days.map(d => d.tempmax))

    return (
        <div>
            <h1 className={stl.title}>{location.city}</h1>
            <div className={stl.dayList}>
                {weather.days.map(day => (
                    <DayCard key={day.datetime} data={day} globalMin={globalMin} globalMax={globalMax}/>
                ))}
            </div>

        </div>
    )
}