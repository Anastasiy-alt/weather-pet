"use client"

import {useGeolocation} from "@/hooks/useGeolocation";
import {fetchWeather} from "@/lib/weather";
import {useEffect, useState} from "react";
import {Weather} from "@/types/weather";
import WeatherIcon from "@/components/weather/icon";

export default function MainWeatherCard() {
    const {coords, loading: geoLoading} = useGeolocation();
    const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
        if (!coords) return;
        fetchWeather(coords.lat, coords.lon).then(setWeather);
    }, [coords]);

    if (geoLoading) return <p>Определяем местоположение...</p>;
    console.log(weather)
    return (
        <>
            {weather && <article>
                <p>{weather.currentConditions?.temp > 0 && '+'}{weather.currentConditions?.temp}</p>
                <WeatherIcon name={weather.currentConditions.icon} />
            </article>}
        </>
    );
}