'use client'
import MainBike from "@/components/bike/main";
import {useWeatherStore} from "@/store/weather";
import Loader from "@/components/ui/loader";
import stl from './bike.module.sass'
import {BIKE_CONDITIONS, CLOTHING_ADVICE, RESULT_CONDITIONS} from "@/components/bike/const";
import {BikeAnalysis, BikeValue} from "@/types";
import {useEffect, useRef, useState} from "react";
import CardBike from "@/components/bike/card";

interface Result {
    title: string
    id: string
    description: string
    key: number | string
    weight: number
    point: number
    keyProp: string
}

export default function BikeWidget() {
    const {weather, location, loading, refresh} = useWeatherStore()
    const [result, setResult] = useState(0)
    const speed = useRef<number>(0)
    const gust = useRef<number>(0)
    const [resulArr, setResultArr] = useState<Result[]>([])

    function getResultConditions(val: number) {
        return RESULT_CONDITIONS.find(i => val <= i.max) ?? RESULT_CONDITIONS[RESULT_CONDITIONS.length - 1]
    }

    const resultConditions = getResultConditions(result)

    type DaylightState =
        'night-before' | 'pre-dawn' | 'sunrise' | 'morning' |
        'midday' | 'afternoon' | 'sunset' | 'dusk' | 'night'

    const getDaylightState = (
        currentTime: Date,
        sunrise: Date,
        sunset: Date
    ): DaylightState => {
        const now = currentTime.getTime()
        const sunriseMs = sunrise.getTime()
        const sunsetMs = sunset.getTime()
        const dayLength = sunsetMs - sunriseMs

        const minutesFromSunrise = (now - sunriseMs) / 60000
        const minutesFromSunset = (now - sunsetMs) / 60000

        if (minutesFromSunrise < -60) return 'night-before'
        if (minutesFromSunrise < 0) return 'pre-dawn'
        if (minutesFromSunrise < 60) return 'sunrise'
        if (minutesFromSunset > 60) return 'night'
        if (minutesFromSunset > 0) return 'dusk'
        if (minutesFromSunset > -60) return 'sunset'

        // середина дня — делим оставшееся время на три части
        const midpoint = sunriseMs + dayLength / 2
        const thirdOfDay = dayLength / 3

        if (now < midpoint - thirdOfDay / 2) return 'morning'
        if (now < midpoint + thirdOfDay / 2) return 'midday'
        return 'afternoon'
    }

    const handleAnalize = (data: BikeAnalysis, key?: number): {
        point: number,
        description: string,
        key: number,
        weight: number
    } => {
        let res: { point: number, description: string, key: number, weight: number } = {
            point: 0,
            description: '',
            key: 0,
            weight: 0
        }
        if (!key) key = 0
        data.values.sort((a, b) => a.point - b.point).forEach((i: BikeValue) => {
            if (i.min && i.max) {
                if (i.min <= key && i.max >= key) {
                    res = {
                        point: i.point,
                        description: i.description,
                        key: key,
                        weight: data.weight
                    }
                }
            } else if (i.max) {
                if (i.max >= key) {
                    res = {
                        point: i.point,
                        description: i.description,
                        key: key,
                        weight: data.weight
                    }
                }
            } else if (i.state) {
                res = {
                    point: i.point,
                    description: i.description,
                    key: key,
                    weight: data.weight
                }
            }
        })
        return res
    }

    function dayAnalize() {

        const arr: Result[] = []
        arr.push({
            id: 'temperature',
            title: 'температура',
            keyProp: '°',
            ...handleAnalize(BIKE_CONDITIONS.temperature, weather?.currentConditions?.temp),
        })
        arr.push({
            id: 'feelsLike',
            title: 'ощущается',
            keyProp: '°',
            ...handleAnalize(BIKE_CONDITIONS.feelsLike, weather?.currentConditions?.feelslike),
        })
        arr.push({
            id: 'windSpeed',
            title: 'ветер',
            keyProp: ' м/с',
            ...handleAnalize(BIKE_CONDITIONS.windSpeed, speed.current),
        })
        arr.push({
            id: 'windGust',
            title: 'порывы',
            keyProp: ' м/с',
            ...handleAnalize(BIKE_CONDITIONS.windGust, gust.current),
        })
        arr.push({
            id: 'precipProb',
            title: 'осадки',
            keyProp: '%',
            ...handleAnalize(BIKE_CONDITIONS.precipProb, weather?.currentConditions?.precipprob),
        })

        arr.push({
            id: 'humidity',
            title: 'влажность',
            keyProp: '%',
            ...handleAnalize(BIKE_CONDITIONS.humidity, weather?.currentConditions?.humidity),
        })
        arr.push({
            id: 'visibility',
            title: 'видимость',
            keyProp: ' км',
            ...handleAnalize(BIKE_CONDITIONS.visibility, weather?.currentConditions?.visibility),
        })
        arr.push({
            id: 'uvIndex',
            title: 'УФ-индекс',
            keyProp: '',
            ...handleAnalize(BIKE_CONDITIONS.uvIndex, weather?.currentConditions?.uvindex),
        })
        arr.push({
            id: 'cloudy',
            title: 'облачность',
            keyProp: '%',
            ...handleAnalize(BIKE_CONDITIONS.cloudy, weather?.currentConditions?.cloudcover),
        })
        if (weather?.currentConditions.sunriseEpoch && weather?.currentConditions.sunsetEpoch) {
            const now = new Date()
            const nowTime = new Date(now.toLocaleString('en-US', {timeZone: weather?.timezone}))
            const state = getDaylightState(
                nowTime,
                new Date(weather?.currentConditions.sunriseEpoch * 1000), // если unix timestamp
                new Date(weather?.currentConditions.sunsetEpoch * 1000)
            )
            const daylightInfo = BIKE_CONDITIONS.daylight.values.find(v => v.state === state)
            console.log(daylightInfo)
            if (daylightInfo) {
                arr.push({
                    id: 'daylight',
                    title: 'время',
                    keyProp: '',
                    key: nowTime.getHours() + ':' + nowTime.getMinutes(),
                    weight: BIKE_CONDITIONS.daylight.weight,
                    ...daylightInfo,
                })
            }

        }


        arr.find((i) => i.id === 'feelsLike' && (i.description = ''))

        const obj = arr.find(o => o.id === 'feelsLike');
        if (obj) {
            CLOTHING_ADVICE.sort((a: {
                max: number
                advice: string
            }, b: {
                max: number
                advice: string
            }): number => b.max - a.max).forEach((adv: {
                max: number
                advice: string
            }) => {
                if (typeof obj.key === 'number' && adv.max >= obj.key) {
                    obj.description = adv.advice
                }
            });
        }

        let sum = 0
        let sumWeight = 0
        arr.forEach((i) => {
            if (i.weight) {
                if (i.point) sum = sum + (i.point * i.weight)
                sumWeight = sumWeight + i.weight
            }
        })
        setResultArr(arr)
        setResult(Math.round((sum / sumWeight) * 20))
        console.log(arr)

    }

    useEffect(() => {
        if (typeof weather?.currentConditions?.windspeed === 'number') {
            speed.current = Math.round(weather?.currentConditions?.windspeed * (1000 / 3600))
            if (typeof weather?.currentConditions?.windgust === 'number') {
                gust.current = Math.round(weather?.currentConditions?.windgust * (1000 / 3600))
            } else {
                gust.current = speed.current
            }
        }
        dayAnalize()
    }, [weather]);

    console.log(weather)

    function hourAnalize() {

    }

    if (loading || !weather || !location) return <Loader/>
    return (
        <section className={stl.page}>
            <MainBike city={location.city}
                      refresh={refresh}
                      value={result}
                      title={resultConditions.title}
                      subtitle={resultConditions.description}
            />
            {
                resulArr.map((i: Result) => (
                    <CardBike key={i.id} title={i.title}
                              value={(Number.isInteger(i.key) ? i.key.toString() : (typeof i.key === 'number' ? i.key.toFixed(1) : i.key)) + i.keyProp}
                              tip={''} description={i.description}/>

                ))
            }

            {/*На улице {weather.currentConditions.temp}°C, ощущается как {weather.currentConditions.feelslike}°C.*/}
            {/*Ветер {speed} м/с, порывы до {gust} м/с.*/}
            {/*Вероятность дождя — {weather.currentConditions.precipprob}%,*/}
            {/*влажность {weather.currentConditions.humidity}%, УФ-индекс {weather.currentConditions.uvindex},*/}
            {/*видимость {weather.currentConditions.visibility} км.*/}
            {/*Больше всего на оценку повлияли: . Именно они определили итоговый результат.*/}

        </section>
    )
}