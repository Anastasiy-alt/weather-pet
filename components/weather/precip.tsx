import stl from './weather.module.sass'
import WeatherIcon from "@/components/weather/icon";

interface PrecipProps {
    precip: number
    cloudcover: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: string[]
    humidity: number
    visibility: number
}

export default function Precip({
                                   precip,
                                   cloudcover,
                                   precipprob,
                                   snow,
                                   snowdepth,
                                   preciptype,
                                   humidity,
                                   visibility
                               }: PrecipProps) {
    const preciptypeTranslate: Record<string, string> = {
        rain: 'Дождь',
        snow: 'Снег',
        freezingrain: 'Ледяной дождь',
        ice: 'Лёд',
    }


    return (
        <div className={stl.precip}>
            <p className={stl.precip__title}>Осадки
            </p>
            <div className={stl.precip__grid}>
                <div className={stl.precip__item}>
                    <p className={stl.precip__itemTitle}>Количество</p>
                    <p className={stl.precip__itemValue}>{precip} <span>мм</span></p>
                </div>
                <div className={stl.precip__item}>
                    <p className={stl.precip__itemTitle}>Вероятность</p>
                    <p className={stl.precip__itemValue}>{precipprob} <span>%</span></p>
                </div>
                {
                    (snow > 0 || snowdepth > 0) &&
                    <>
                        <div className={stl.precip__item}>
                            <p className={stl.precip__itemTitle}>Снег</p>
                            <p className={stl.precip__itemValue}>{snow} <span>см</span></p>
                        </div>
                        <div className={stl.precip__item}>
                            <p className={stl.precip__itemTitle}>Снежный покров</p>
                            <p className={stl.precip__itemValue}>{snowdepth} <span>см</span></p>
                        </div>
                    </>
                }
            </div>
            <div className={stl.precip__types}>
                {
                    preciptype.map((item) => (
                        <div className={stl.precip__type}>
                            <WeatherIcon key={item} name={item}/>
                            {preciptypeTranslate[item]}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}