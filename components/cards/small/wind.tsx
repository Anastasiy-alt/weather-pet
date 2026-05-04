import stl from "./cards.module.sass";
import LocationIcon from "@/assets/icons/location.svg";
import Wind from '@/assets/icons/weather/wind.svg'

interface WindProps {
    dir: number
    speed: number
    gust: number
    small?: boolean
}

const WIND_LEVELS = [
    {
        max: 1,
        description: 'Идеально для велосипеда — ничто не мешает',
    },
    {
        max: 3,
        description: 'Ветер есть, но ведёт себя прилично',
    },
    {
        max: 5,
        description: 'Свежо и приятно — гулять одно удовольствие',
    },
    {
        max: 8,
        description: 'Ветер уже мнения имеет — и активно его высказывает',
    },
    {
        max: 12,
        description: 'На велосипеде в одну сторону легко, в другую — уже работа',
    },
    {
        max: 17,
        description: 'Ветер решил что он тут главный. Не спорь',
    },
    {
        max: Infinity,
        description: 'Ветер выиграл. Оставайся дома',
    },
] as const
export default function WindSmall({dir, speed, gust, small}: WindProps) {
    const dirs: string[] = ['С', 'ССВ', 'СВ', 'ВСВ', 'В', 'ВЮВ', 'ЮВ', 'ЮЮВ', 'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ', 'З', 'ЗСЗ', 'СЗ', 'ССЗ']

    function getWindDirection(deg: number): string {
        const index = Math.round(deg / 22.5) % 16
        return dirs[index]
    }

    function convertSpeed(speed: number) {
        return Math.round(speed * (1000 / 3600))
    }

    function getWindLevel(speed: number) {
        return WIND_LEVELS.find(l => speed <= l.max) ?? WIND_LEVELS[WIND_LEVELS.length - 1]
    }

    const dirString = getWindDirection(dir)
    const speedMeters = convertSpeed(speed)
    const gustMeters = convertSpeed(gust ? gust : speed)
    const level = getWindLevel(speedMeters)
    return (
        <div className={`${stl.wind} ${stl.card} ${small ? stl.card_small : ''}`}>
            <div className={stl.card__icon}>
                <LocationIcon className={stl.wind__icon} style={{'--dir': dir + 'deg'} as React.CSSProperties}/>
            </div>
            <Wind className={stl.wind__deco} />

            <p className={stl.card__title}>Ветер {dirString} {speedMeters}м/с</p>
            <p className={stl.card__subtitle}>Порывы: {gustMeters}м/с</p>
            <p className={stl.card__tag}>{level.description}</p>
        </div>
    )
}