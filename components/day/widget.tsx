'use client'

import {useWeatherStore} from '@/store/weather'
import Loader from "@/components/ui/loader"
import stl from './day.module.sass'
import Recharts from "@/components/day/rechart";
import Main from "@/components/weather/main";
import {Day as DayType, Hour as HourType} from "@/types";
import Precip from "@/components/weather/precip";
import Wind from "@/components/weather/wind";
import UVindex from "@/components/cards/small/uv";
import Cloudy from "@/components/cards/small/cloudy";
import Visible from "@/components/cards/small/visible";
import MoonPhase from "@/components/cards/small/moonPhase";
import Humidity from "@/components/cards/small/humidity";
import TempRange from "@/components/cards/small/temp";
import SunArc from "@/components/weather/sun-arc";
import {useEffect, useRef} from "react";
import {useDayStore} from "@/store/day";
import Button from "@/components/ui/button";
import PrecipSmall from "@/components/cards/small/precip";
import TempFeels from "@/components/cards/small/feelsTemp";
import DayNotFound from "@/components/day/notFound";
import WindSmall from "@/components/cards/small/wind";

export default function OneDayWidget({slug}: { slug: string }) {
    const {weather, location, loading, refresh} = useWeatherStore()
    const {activeHourIndex, clearActiveHourIndex} = useDayStore()
    const chart = useRef<HTMLDivElement>(null)
    const currentWeather: DayType | undefined = weather?.days?.find(day => day.datetime === slug)
    const activeHour: HourType | undefined = activeHourIndex !== undefined ? currentWeather?.hours[activeHourIndex] : undefined
    const currentDay = new Date(slug)

    useEffect(() => {
        return () => clearActiveHourIndex()
    }, [clearActiveHourIndex, slug])

    if (loading || !weather || !location) return <Loader/>


    const formattedDate = currentDay.toLocaleDateString('ru-RU', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    function hideHour() {
        chart.current?.classList.remove(stl.page__chart_active)
        setTimeout(() => {
            clearActiveHourIndex()
        }, 350)
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
                                <div className={`${stl.page__chart} ${activeHour ? stl.page__chart_active : ''}`}
                                     ref={chart}>
                                    <p className={stl.page__chartTitle}>Прогноз на 24 часа</p>
                                    <Recharts data={currentWeather?.hours}/>
                                    {activeHour &&

                                        <div className={stl.page__layoutHour}>
                                            <div className={stl.page__hiddenHour}>
                                                {`${formattedDate} 
                                                  ${activeHour.datetime.slice(0, 5)}`}
                                                <Button text='Скрыть'
                                                        secondary={true}
                                                        variant='btn'
                                                        action={hideHour}/>

                                            </div>
                                            <WindSmall dir={activeHour.winddir} speed={activeHour.windspeed} gust={activeHour.windgust} small={true} />

                                            <UVindex small={true}
                                                     uv={activeHour.uvindex}/>
                                            <Cloudy small={true}
                                                    percent={activeHour.cloudcover}/>
                                            <Visible small={true}
                                                     vis={activeHour.visibility}/>
                                            <Humidity small={true}
                                                      percent={activeHour.humidity}/>
                                            <PrecipSmall precipprob={activeHour.precipprob}
                                                         preciptype={activeHour.preciptype}
                                                         small={true}/>
                                            <TempFeels feels={activeHour.feelslike} fact={activeHour.temp}
                                                       small={true}/>
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
                        : <DayNotFound/>
                }</>
                : <Loader/>
        }
        </>
    )
}