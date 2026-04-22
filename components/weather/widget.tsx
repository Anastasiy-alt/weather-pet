"use client"
import stl from './weather.module.sass'

import {useGeolocation} from "@/hooks/useGeolocation";
import {fetchWeather} from "@/lib/weather";
import {fetchLocation} from "@/lib/location"
import {useEffect, useState} from "react";
import {Weather} from "@/types/weather";
import {Location} from "@/types/location";
import Main from "@/components/weather/main";
import SunArc from '@/components/weather/sun-arc'
import Wind from "@/components/weather/wind";
import Precip from "@/components/weather/precip";
import Loader from "@/components/ui/loader";

export default function MainWeatherCard() {
    const {coords, error} = useGeolocation();
    const [weather, setWeather] = useState<Weather | null>(null);
    const [location, setLocation] = useState<Location | null>(null)

    function update() {
        if (!coords) return;
        setWeather(null)
        setLocation(null)
        fetchWeather(coords.lat, coords.lon).then(setWeather)
        fetchLocation(coords.lat, coords.lon).then(setLocation)
    }

    useEffect(() => {
        update()
    }, [coords]);

    console.log('WEATHER: ', weather)
    console.log('LOCATION: ', location)
    return (
        <>
            {(weather && location) ?
                <section className={stl.layout}>
                    <Main city={location.city}
                          temp={weather.currentConditions?.temp}
                          icon={weather.currentConditions.icon}
                          conditions={weather.currentConditions.conditions}
                          feelslike={weather.currentConditions?.feelslike}
                          datetime={weather.currentConditions?.datetime}
                          alerts={weather.alerts}
                          update={update}/>
                    <SunArc sunrise={weather.currentConditions.sunrise}
                            sunsetEpoch={weather.currentConditions.sunsetEpoch}
                            sunriseEpoch={weather.currentConditions.sunriseEpoch}
                            sunset={weather.currentConditions.sunset}/>
                    <Precip precip={weather.currentConditions.precip}
                            cloudcover={weather.currentConditions.cloudcover}
                            precipprob={weather.currentConditions.precipprob}
                            snow={weather.currentConditions.snow}
                            snowdepth={weather.currentConditions.snowdepth}
                            preciptype={weather.currentConditions.preciptype}
                            humidity={weather.currentConditions.humidity}
                            visibility={weather.currentConditions.visibility}/>
                    <Wind dir={weather.currentConditions.winddir}
                          gust={weather.currentConditions.windgust}
                          speed={weather.currentConditions.windspeed}/>
                </section> :
               <Loader />
            }</>
    );
}