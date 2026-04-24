"use client"
import stl from './weather.module.sass'
import Main from "@/components/weather/main";
import SunArc from '@/components/weather/sun-arc'
import Wind from "@/components/weather/wind";
import Precip from "@/components/weather/precip";
import Loader from "@/components/ui/loader";
import MoonPhase from "@/components/weather/smallCards/moonPhase";
import Cloudy from "@/components/weather/smallCards/cloudy";
import UVindex from "@/components/weather/smallCards/uv";
import Visible from "@/components/weather/smallCards/visible";
import Humidity from "@/components/weather/smallCards/humidity";
import TempRange from "@/components/weather/smallCards/temp";
import {useWeatherStore} from "@/store/weather";

export default function MainWeatherCard() {
    const { weather, location, loading, refresh } = useWeatherStore()

    if (loading || !weather || !location) return <Loader />
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
                          update={refresh}/>
                    <SunArc sunrise={weather.currentConditions.sunrise}
                            sunsetEpoch={weather.currentConditions.sunsetEpoch}
                            sunriseEpoch={weather.currentConditions.sunriseEpoch}
                            sunset={weather.currentConditions.sunset}/>
                    <Precip precip={weather.currentConditions.precip}
                            precipprob={weather.currentConditions.precipprob}
                            snow={weather.currentConditions.snow}
                            snowdepth={weather.currentConditions.snowdepth}
                            preciptype={weather.currentConditions.preciptype}/>
                    <Wind dir={weather.currentConditions.winddir}
                          gust={weather.currentConditions.windgust}
                          speed={weather.currentConditions.windspeed}/>
                    <UVindex uv={weather.currentConditions.uvindex}/>
                    <Cloudy percent={weather.currentConditions.cloudcover}/>
                    <Visible vis={weather.currentConditions.visibility}/>
                    <MoonPhase phase={weather.currentConditions.moonphase}/>
                    <Humidity percent={weather.currentConditions.humidity}/>
                    <TempRange tempmax={weather.days[0].tempmax} tempmin={weather.days[0].tempmin}/>
                </section> :
                <Loader/>
            }</>
    );
}