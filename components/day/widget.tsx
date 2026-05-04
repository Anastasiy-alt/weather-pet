'use client'

import {useWeatherStore} from '@/store/weather'
import Loader from "@/components/ui/loader"
import stl from './day.module.sass'
import Main from "@/components/weather/main";
import {Day as DayType} from "@/types";
import Precip from "@/components/weather/precip";
import Wind from "@/components/weather/wind";
import UVindex from "@/components/cards/small/uv";
import Cloudy from "@/components/cards/small/cloudy";
import Visible from "@/components/cards/small/visible";
import MoonPhase from "@/components/cards/small/moonPhase";
import Humidity from "@/components/cards/small/humidity";
import TempRange from "@/components/cards/small/temp";
import SunArc from "@/components/weather/sun-arc";
import DayNotFound from "@/components/day/notFound";
import WeatherHours from "@/components/day/hoursWeather";

export default function OneDayWidget({slug}: { slug: string }) {
    const {weather, location, loading, refresh} = useWeatherStore()
    const currentWeather: DayType | undefined = weather?.days?.find(day => day.datetime === slug)
    const currentDay = new Date(slug)

    if (loading || !weather || !location) return <Loader/>

    const formattedDate = currentDay.toLocaleDateString('ru-RU', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>{
            weather ?
                <>{
                    currentWeather ?
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
                        : <DayNotFound/>
                }</>
                : <Loader/>
        }
        </>
    )
}