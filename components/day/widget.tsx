'use client'

import {useWeatherStore} from '@/store/weather'
import Loader from "@/components/ui/loader"
import stl from './day.module.sass'
import Main from "@/components/weather/main";
import {Day as DayType} from "@/types";
import Precip from '@/components/stats/precip'
import Wind from '@/components/stats/wind'
import UVindex from '@/components/stats/small/uv'
import Cloudy from '@/components/stats/small/cloudy'
import Visible from '@/components/stats/small/visible'
import MoonPhase from '@/components/stats/small/moonPhase'
import Humidity from '@/components/stats/small/humidity'
import TempRange from '@/components/stats/small/temp'
import SunArc from '@/components/stats/sun-arc'
import DayNotFound from '@/components/day/notFound'
import WeatherHours from '@/components/stats/hoursWeather'

export default function OneDayWidget({slug}: { slug: string }) {
    const {weather, location, loading, refresh} = useWeatherStore()
    const currentWeather: DayType | undefined = weather?.days?.find(day => day.datetime === slug)
    const currentDay = new Date(slug)

    if (loading || !weather || !location) return <Loader/>
    if (!currentWeather) return <DayNotFound/>

    const formattedDate = currentDay.toLocaleDateString('ru-RU', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className={stl.page}>
            <h1 className={stl.page__title}>{formattedDate}</h1>
            <Main city={location.city}
                  temp={currentWeather.temp}
                  icon={currentWeather.icon}
                  conditions={currentWeather.conditions}
                  update={refresh}
                  feelslike={currentWeather.feelslike}/>
            <WeatherHours slug={slug}/>
            <p className={stl.page__subtitle}>В среднем за день:</p>
            <div className={stl.page__layout}>
                <SunArc sunrise={currentWeather.sunrise}
                        sunsetEpoch={currentWeather.sunsetEpoch}
                        sunriseEpoch={currentWeather.sunriseEpoch}
                        sunset={currentWeather.sunset}/>
                <Precip precip={currentWeather.precip}
                        precipprob={currentWeather.precipprob}
                        snow={currentWeather.snow}
                        snowdepth={currentWeather.snowdepth}
                        preciptype={currentWeather.preciptype}/>
                <Wind dir={currentWeather.winddir}
                      gust={currentWeather.windgust}
                      speed={currentWeather.windspeed}/>
                <UVindex uv={currentWeather.uvindex}/>
                <Cloudy percent={currentWeather.cloudcover}/>
                <Visible vis={currentWeather.visibility}/>
                <MoonPhase phase={currentWeather.moonphase}/>
                <Humidity percent={currentWeather.humidity}/>
                <TempRange tempmax={currentWeather.tempmax} tempmin={currentWeather.tempmin}/>
            </div>
        </div>
    )
}