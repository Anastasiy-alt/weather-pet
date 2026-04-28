import stl from './cards.module.sass'
import {Day as DayType} from "@/types";
import WeatherIcon from "@/components/weather/ui/icon";
import WindIcon from '@/assets/icons/location.svg'
import HumidityIcon from '@/assets/icons/humidity.svg'
import Link from "next/link";

interface DayProps {
    data: DayType
    globalMin: number
    globalMax: number
}

function tempHue(t: number) {
    if (t <= -10) return "#1368aa";
    if (t <= 0) return "#4091c9";
    if (t <= 10) return "#9dcee2";
    if (t <= 18) return "#72b01d";
    if (t <= 25) return "#FFB703";
    if (t <= 32) return "#FB8500";
    return "#ae2012";
}

const iconDescriptions: Record<string, string> = {
    'clear-day': 'Солнечно и без сюрпризов — выходи смело',
    'clear-night': 'Звёздное небо, луна на месте',
    'cloudy': 'Серо, но сухо — могло быть хуже',
    'fog': 'Туман такой, что соседний дом уже загадка',
    'hail': 'Град. Машину лучше спрятать',
    'partly-cloudy-day': 'Солнце есть, облака тоже — компромисс',
    'partly-cloudy-night': 'Луна иногда прячется за облака',
    'rain': 'Дождь идёт — зонт обязателен',
    'rain-snow': 'Дождь со снегом — погода не может определиться',
    'rain-snow-showers-day': 'Днём то дождь, то снег — одевайся по ситуации',
    'rain-snow-showers-night': 'Ночью мешанина из дождя и снега',
    'showers-day': 'Дожди днём — зонт не помешает',
    'showers-night': 'Ночью пройдут небольшие дожди',
    'snow': 'Снег идёт — красиво, но дороги скользкие',
    'snow-showers-day': 'Снежные заряды днём — может резко припорошить',
    'snow-showers-night': 'Ночью снег, утром сугробы будут',
    'thunder': 'Гроза без дождя — небо злится',
    'thunder-rain': 'Гроза с дождём — сиди дома и слушай как гремит',
    'thunder-showers-day': 'Днём грозовые ливни — лучше переждать',
    'thunder-showers-night': 'Ночная гроза с дождём — впечатляет из окна',
    'wind': 'Ветер сильный — шапку держи крепче',
    'ice': 'Гололёд — ступай осторожно',
}

export default function DayCard({data, globalMin, globalMax}: DayProps) {
    console.log(data)
    const date = new Date(data.datetime);
    const today = new Date()
    const minColor = tempHue(data.tempmin)
    const maxColor = tempHue(data.tempmax)
    const range = globalMax - globalMin
    const minPct = ((data.tempmin - globalMin) / range) * 100
    const maxPct = ((data.tempmax - globalMin) / range) * 100

    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    const formattedDateWeek: () => string = () => {
        if (isToday) return 'Сегодня'
        return date.toLocaleDateString('ru-RU', {
            weekday: 'short',
        })
    }

    const formattedDate = date.toLocaleDateString('ru-RU', {
        month: 'long',
        day: 'numeric',
    });
    const convertSpeed = () => {
        return Math.round(data.windspeed * (1000 / 3600))
    }

    return (
        <Link href={`/day/${data.datetime}`} className={stl.day}>
            <div className={stl.day__top}>
                <div className={stl.day__block}>
                    <p className={`${stl.day__blockTitle} ${!isToday && stl.day__blockTitle_up}`}>{formattedDateWeek()}</p>
                    <p className={stl.day__blockSubtitle}>{formattedDate}</p>
                </div>
                <div className={stl.day__temp}>
                    <p className={stl.day__blockTitle}>{data.temp > 0 ? `+${data.temp}` : data.temp}°</p>
                    <WeatherIcon name={data.icon}/>
                    <div className={stl.day__tempHover}>
                        <p className={stl.day__tempTitle}>{data.conditions}</p>
                        <p className={stl.day__tempSubtitle}>{iconDescriptions[data.icon]}</p>
                    </div>

                </div>
                <div className={stl.day__block}>
                    <p className={stl.day__blockSubtitle}>Влажность</p>
                    <p className={stl.day__blockTitle}>
                        <HumidityIcon className={stl.day__icon}/>
                        {Math.round(data.humidity)}%</p>
                </div>
                <div className={stl.day__block}>
                    <p className={stl.day__blockSubtitle}>Ветер</p>
                    <p className={stl.day__blockTitle}>
                        <WindIcon style={{'--dir': data.winddir - 45 + 'deg'} as React.CSSProperties}
                                  className={`${stl.day__icon} ${stl.day__icon_wind}`}/>
                        {convertSpeed()}м/с</p>
                </div>
            </div>
            <hr className={stl.day__hr}/>
            <div className={stl.tempRange}>
                <p className={stl.tempRange__text} style={{color: minColor}}>
                    {data.tempmin > 0 ? `+${data.tempmin}` : data.tempmin}°
                </p>
                <div className={stl.tempRange__fill}>
                    <div
                        className={stl.tempRange__track}
                        style={{
                            left: `${minPct}%`,
                            width: `${Math.max(4, maxPct - minPct)}%`,
                            background: `linear-gradient(90deg, ${minColor}, ${maxColor})`
                        }}
                    />
                </div>
                <p className={`${stl.tempRange__text} ${stl.tempRange__text_right}`} style={{color: maxColor}}>
                    {data.tempmax > 0 ? `+${data.tempmax}` : data.tempmax}°
                </p>
            </div>
        </Link>
    )
}