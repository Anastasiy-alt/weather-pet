'use client'
import MainBike from "@/components/bike/main";
import {useWeatherStore} from "@/store/weather";
import Loader from "@/components/ui/loader";
import stl from './bike.module.sass'
import {BIKE_CONDITIONS, RESULT_CONDITIONS} from "@/components/bike/const";
import {BikeAnalysis, BikeValue} from "@/types";
import {useEffect, useState} from "react";


export default function BikeWidget() {
    const {weather, location, loading, refresh} = useWeatherStore()
    const [result, setResult] = useState(0)

    function getResultConditions(val: number) {
        return RESULT_CONDITIONS.find(i => val <= i.max) ?? RESULT_CONDITIONS[RESULT_CONDITIONS.length - 1]
    }

    const resultConditions = getResultConditions(result)


    const handleAnalize = (data: BikeAnalysis, key?: number): {
        point: number,
        description: string,
        key: number,
        weight: number
    } | null => {
        let res: { point: number, description: string, key: number, weight: number } | null = null
        console.log(key)
        if (!key) key = 0
        data.values.sort((a, b) => a.point - b.point).forEach((i: BikeValue) => {
            if (i.min) {
                if (i.min <= key && i.max >= key) {
                    res = {
                        point: i.point,
                        description: i.description,
                        key: key,
                        weight: data.weight
                    }
                }
            } else {
                if (i.max >= key) {
                    res = {
                        point: i.point,
                        description: i.description,
                        key: key,
                        weight: data.weight
                    }
                }
            }
        })
        return res
    }

    function dayAnalize() {
        let speed = 0
        let gust = 0
        if (typeof weather?.currentConditions?.windspeed === 'number') {
            speed = Math.round(weather?.currentConditions?.windspeed)
            if (typeof weather?.currentConditions?.windgust === 'number') {
                gust = Math.round(weather?.currentConditions?.windgust)
            } else {
                gust = speed
            }
        }
        const resultArr = []
        resultArr.push({
            title: 'temperature',
            ...handleAnalize(BIKE_CONDITIONS.temperature, weather?.currentConditions?.temp),
        })
        resultArr.push({
            title: 'feelsLike',
            ...handleAnalize(BIKE_CONDITIONS.feelsLike, weather?.currentConditions?.feelslike),
        })
        resultArr.push({
            title: 'windSpeed',
            ...handleAnalize(BIKE_CONDITIONS.windGust, speed),
        })
        resultArr.push({
            title: 'windGust',
            ...handleAnalize(BIKE_CONDITIONS.windGust, gust),
        })
        resultArr.push({
            title: 'precipProb',
            ...handleAnalize(BIKE_CONDITIONS.precipProb, weather?.currentConditions?.precipprob),
        })
        resultArr.push({
            title: 'visibility',
            ...handleAnalize(BIKE_CONDITIONS.visibility, weather?.currentConditions?.visibility),
        })
        resultArr.push({
            title: 'humidity',
            ...handleAnalize(BIKE_CONDITIONS.humidity, weather?.currentConditions?.humidity),
        })
        resultArr.push({
            title: 'uvIndex',
            ...handleAnalize(BIKE_CONDITIONS.uvIndex, weather?.currentConditions?.uvindex),
        })

        let sum = 0
        let sumWeight = 0
        let result = 0
        resultArr.forEach((i) => {
            if (i.weight) {
                if (i.point) sum = sum + (i.point * i.weight)
                sumWeight = sumWeight + i.weight
            }
        })

        setResult(Math.round((sum / sumWeight) * 20))
        console.log(resultArr)

    }

    useEffect(() => {
        dayAnalize()
    }, [weather]);


    function hourAnalize() {

    }

    if (loading || !weather || !location) return <Loader/>
    return (
        <section className={stl.page}>
            <MainBike city={location.city}
                      refresh={refresh}
                      value={result}
                      title={resultConditions.title + result}
                      subtitle={resultConditions.description}
                      description={'У попа была собака, он её любил. Она съела кусок мяса - он её убил. На могиле написали: у попа была собака, он её любил. Она съела кусок мяса - он её убил'}/>
        </section>
    )
}