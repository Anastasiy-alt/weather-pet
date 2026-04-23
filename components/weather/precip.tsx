import stl from './weather.module.sass'
import WeatherIcon from "@/components/weather/ui/icon";

interface PrecipProps {
    precip: number
    precipprob: number
    snow: number
    snowdepth: number
    preciptype: string[]
}

const NO_PRECIP_MESSAGES = [
    'Тучи сегодня взяли выходной и уехали отдыхать — осадков не ожидается совсем',
    'Дождь? Первый раз слышу. Сегодня настолько сухо, что зонт обидится если его взять',
    'Облака решили не напрягаться и просто украшают небо — никаких осадков не будет',
    'Ни капли, ни снежинки, ни даже намёка — погода сегодня явно проснулась в хорошем настроении',
    'Зонт сегодня официально безработный — можно смело оставить его скучать в прихожей',
    'Небо чистое, тучи в отпуске, дождь уехал в командировку — всё говорит о сухой погоде',
    'Сегодня даже лужи не знают чем заняться — осадков нет и в ближайшее время не предвидится',
    'Погода решила устроить себе сухой день — ни дождя, ни снега, просто тишина и сухость',
]
export default function Precip({
                                   precip,
                                   precipprob,
                                   snow,
                                   snowdepth,
                                   preciptype,
                               }: PrecipProps) {
    const preciptypeTranslate: Record<string, string> = {
        rain: 'Дождь',
        snow: 'Снег',
        freezingrain: 'Ледяной дождь',
        ice: 'Лёд',
    }

    const emptyMsg = NO_PRECIP_MESSAGES[Math.round(Math.random() * NO_PRECIP_MESSAGES.length)]


    return (
        <div className={`${stl.precip} ${stl.card}`}>
            <p className={stl.precip__title}>Осадки
            </p>
            {
                (precip > 0 || precipprob > 0 || snow > 0 || snowdepth > 0) ?

                    <div className={stl.precip__grid}>

                        {
                            precip > 0 &&
                            <div className={stl.precip__item}>
                                <p className={stl.precip__itemTitle}>Количество</p>
                                <p className={stl.precip__itemValue}>{precip} <span>мм</span></p>
                            </div>
                        }
                        {precipprob > 0 &&
                            <div className={stl.precip__item}>
                                <p className={stl.precip__itemTitle}>Вероятность</p>
                                <p className={stl.precip__itemValue}>{precipprob} <span>%</span></p>
                            </div>
                        }

                        {snow > 0 &&

                            <div className={stl.precip__item}>
                                <p className={stl.precip__itemTitle}>Снег</p>
                                <p className={stl.precip__itemValue}>{snow} <span>см</span></p>
                            </div>
                        }
                        {snowdepth > 0 &&
                            <div className={stl.precip__item}>
                                <p className={stl.precip__itemTitle}>Снежный покров</p>
                                <p className={stl.precip__itemValue}>{snowdepth} <span>см</span></p>
                            </div>
                        }

                    </div>
                    :
                    <div className={stl.precip__title}>
                        {emptyMsg}
                    </div>
            }

            <div className={stl.precip__types}>
                {preciptype?.map((item) => (
                    <div className={stl.precip__type} key={item}>
                        <WeatherIcon name={item}/>
                        {preciptypeTranslate[item]}
                    </div>
                ))}
            </div>
        </div>
    )
}