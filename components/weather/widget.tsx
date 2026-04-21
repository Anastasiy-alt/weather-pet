"use client"
import stl from './weather.module.sass'

import {useGeolocation} from "@/hooks/useGeolocation";
import {fetchWeather} from "@/lib/weather";
import {fetchLocation} from "@/lib/location"
import {useEffect, useState} from "react";
import {Weather} from "@/types/weather";
import {Location} from "@/types/location";
import WeatherIcon from "@/components/weather/icon";
import Alert from "@/components/weather/alert";
import Button from "@/components/ui/button";
import LocationIcon from '@/assets/icons/location.svg'
import SunArc from '@/components/weather/sun-arc'

export default function MainWeatherCard() {
    const {coords, loading: geoLoading} = useGeolocation();
    const [weather, setWeather] = useState<Weather | null>(null);
    const [location, setLocation] = useState<Location | null>(null)

    function update() {
        if (!coords) return;
        setWeather(null)
        fetchWeather(coords.lat, coords.lon).then(setWeather)
        fetchLocation(coords.lat, coords.lon).then(setLocation)
    }

    useEffect(() => {
        update()
    }, [coords]);


    if (geoLoading) return <p>Определяем местоположение...</p>;
    console.log(weather)
    console.log('LOCATION: ', location)
    return (
        <>
            {weather && <section className={stl.layout}>
                <article className={stl.widget}>
                    <Button classCustom={stl.widget__update} text='Обновить' variant='btn' action={update}/>
                    <div className={stl.widget__main}>

                        <p className={stl.widget__city}>
                            <LocationIcon/>
                            {location?.city}
                        </p>
                        <p className={stl.widget__temp}>{weather.currentConditions?.temp > 0 && '+'}{weather.currentConditions?.temp}°</p>
                        <div className={stl.widget__mainBblock}>
                            <div className={stl.widget__block}>
                                <WeatherIcon name={weather.currentConditions.icon}/>
                                <p className={stl.widget__condition}>{weather.currentConditions.conditions}, ощущается
                                    как {weather.currentConditions?.feelslike > 0 && '+'}{weather.currentConditions.feelslike}°</p>

                            </div>
                            <p className={stl.widget__actual}>Данные актуальны
                                на {weather.currentConditions?.datetime.split(':')[0]}:{weather.currentConditions?.datetime.split(':')[1]}</p>
                        </div>
                    </div>
                    {
                        weather.alerts.length > 0 &&
                        <div className={stl.widget__alerts}>
                            {weather.alerts.map(alert => (
                                <Alert key={alert.id} alert={alert}/>
                            ))}
                        </div>
                    }
                </article>
                <div className={stl.widget__infoBlock}>
                    <SunArc sunrise={weather.currentConditions.sunrise} sunset={weather.currentConditions.sunset}/>

                </div>
            </section>
            }</>
    );
}