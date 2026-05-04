import stl from "@/components/day/day.module.sass";
import Recharts from "@/components/day/rechart";
import Button from "@/components/ui/button";
import WeatherSmall from "@/components/cards/small/weather";
import WindSmall from "@/components/cards/small/wind";
import UVindex from "@/components/cards/small/uv";
import Cloudy from "@/components/cards/small/cloudy";
import Visible from "@/components/cards/small/visible";
import Humidity from "@/components/cards/small/humidity";
import PrecipSmall from "@/components/cards/small/precip";
import TempFeels from "@/components/cards/small/feelsTemp";
import {useWeatherStore} from "@/store/weather";
import {useDayStore} from "@/store/day";
import {useEffect, useRef} from "react";
import {Day as DayType, Hour as HourType} from "@/types";
import Loader from "@/components/ui/loader";

export default function WeatherHours({slug}: { slug: string }) {
    const {weather, location, loading} = useWeatherStore()
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
        chart.current?.classList.remove(stl.hours_active)
        setTimeout(() => {
            clearActiveHourIndex()
        }, 350)
    }

    return (
        <>
            {
                currentWeather?.hours &&
                <div className={`${stl.hours} ${activeHour ? stl.hours_active : ''}`}
                     ref={chart}>
                    <p className={stl.hours__title}>Прогноз на 24 часа</p>
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
                            <WeatherSmall conditions={activeHour.conditions}
                                          icon={activeHour.icon}
                                          small={true}/>
                            <WindSmall dir={activeHour.winddir}
                                       speed={activeHour.windspeed}
                                       gust={activeHour.windgust}
                                       small={true}/>
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
            }   </>
    )
}