"use client"
import stl from './weather.module.sass'
import Main from "@/components/weather/main";
import SunArc from '@/components/stats/sun-arc'
import Wind from '@/components/stats/wind'
import Precip from '@/components/stats/precip'
import Loader from '@/components/ui/loader'
import MoonPhase from '@/components/stats/small/moonPhase'
import Cloudy from '@/components/stats/small/cloudy'
import UVindex from '@/components/stats/small/uv'
import Visible from '@/components/stats/small/visible'
import Humidity from '@/components/stats/small/humidity'
import TempRange from '@/components/stats/small/temp'
import {useWeatherStore} from '@/store/weather'
import WeatherHours from '@/components/stats/hoursWeather'
import YMap from '@/components/weather/map'

export default function MainWeatherCard() {
    const {weather, location, loading, refresh} = useWeatherStore()
    const now = new Date()

    if (loading || !weather || !location) return <Loader/>
    const timeZone = weather.timezone
    const dateInTimezone = new Date(now.toLocaleString('en-US', {timeZone}))
    return (
        <section className={stl.layout}>
            <div className={stl.layout__chart}>
                <YMap lat={location.lat} lon={location.lon}/>
            </div>
            <Main city={location.city}
                  temp={weather.currentConditions?.temp}
                  icon={weather.currentConditions.icon}
                  conditions={weather.currentConditions.conditions}
                  feelslike={weather.currentConditions?.feelslike}
                  datetime={weather.currentConditions?.datetime}
                  alerts={weather.alerts}
                  update={refresh}/>
            <div className={stl.layout__chart}>
                <WeatherHours slug={weather.days[0].datetime}/>
            </div>
            <SunArc sunrise={weather.currentConditions.sunrise}
                    sunsetEpoch={weather.currentConditions.sunsetEpoch}
                    sunriseEpoch={weather.currentConditions.sunriseEpoch}
                    sunset={weather.currentConditions.sunset}
                    now={dateInTimezone}/>
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
        </section>
    );
}