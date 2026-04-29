'use client'

import {useWeatherStore} from '@/store/weather'
import Loader from "@/components/ui/loader"
import stl from './day.module.sass'
import Recharts from "@/components/day/rechart";
import Main from "@/components/weather/main";
import {Day as DayType, Hour as HourType} from "@/types";
import Precip from "@/components/weather/precip";
import Wind from "@/components/weather/wind";
import UVindex from "@/components/weather/smallCards/uv";
import Cloudy from "@/components/weather/smallCards/cloudy";
import Visible from "@/components/weather/smallCards/visible";
import MoonPhase from "@/components/weather/smallCards/moonPhase";
import Humidity from "@/components/weather/smallCards/humidity";
import TempRange from "@/components/weather/smallCards/temp";
import SunArc from "@/components/weather/sun-arc";
import {useState} from "react";

export default function OneDayWidget({slug}: { slug: string }) {
    const {weather, location, loading, refresh} = useWeatherStore()
    const [activeHour, setActiveHour] = useState<HourType | undefined>(undefined)

    if (loading || !weather || !location) return <Loader/>

    const currentWeather: DayType | undefined = weather?.days?.find(day => day.datetime === slug)
    const formattedDate = new Date(slug).toLocaleDateString('ru-RU', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
    console.log('currentWeather', currentWeather)

    function setHour(i: number | string | undefined) {
        if (typeof i === 'number') {
            setActiveHour(currentWeather?.hours[i])
            console.log('RERER', currentWeather?.hours[i])
        } else {
            setActiveHour(undefined)
        }


    }

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
                            {
                                currentWeather?.hours &&
                                <div className={`${stl.page__chart} ${activeHour ? stl.page__chart_active : ''}`}>
                                    <p className={stl.page__chartTitle}>Прогноз на 24 часа</p>
                                    <Recharts data={currentWeather?.hours} setHour={setHour}/>
                                    {activeHour &&
                                        <div className={stl.page__layoutHour}>
                                            <UVindex small={true} uv={activeHour.uvindex}/>
                                            <Cloudy small={true} percent={activeHour.cloudcover}/>
                                            <Visible small={true} vis={activeHour.visibility}/>
                                            <Humidity small={true} percent={activeHour.humidity}/>
                                        </div>
                                    }
                                </div>
                            }
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
                        : <p>Мы не нашли погоду на {slug}</p>
                }</>
                : <Loader/>
        }

        </>
    )
}