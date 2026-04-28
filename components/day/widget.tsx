'use client'

import {useWeatherStore} from '@/store/weather'
import Loader from "@/components/ui/loader"
import stl from './day.module.sass'
import Recharts from "@/components/day/rechart";
import Location from "@/components/ui/location";

export default function OneDayWidget({slug}: { slug: string }) {
    const {weather, location, loading} = useWeatherStore()

    if (loading || !weather || !location) return <Loader/>

    const currentWeather = weather?.days?.find(day => day.datetime === slug)
    const formattedDate = new Date(slug).toLocaleDateString('ru-RU', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
    console.log('currentWeather', currentWeather)
    return (
        <div className={stl.page}>
            <Location city={location.city} />
            <h1 className={stl.title}>Погода на {formattedDate}</h1>
            <div className={stl.dayList}></div>
            {
                currentWeather?.hours &&
                <Recharts data={currentWeather?.hours}/>
            }

        </div>
    )
}