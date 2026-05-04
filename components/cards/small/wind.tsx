import stl from "./cards.module.sass";
import LocationIcon from "@/assets/icons/location.svg";

interface WindProps {
    dir: number
    speed: number
    gust: number
    small?: boolean
}

const WIND_LEVELS = [
    {
        max: 1,
        label: 'Штиль',
        description: 'Идеально для велосипеда — ничто не мешает',
    },
    {
        max: 3,
        label: 'Тихий',
        description: 'Ветер есть, но ведёт себя прилично',
    },
    {
        max: 5,
        label: 'Слабый',
        description: 'Свежо и приятно — гулять одно удовольствие',
    },
    {
        max: 8,
        label: 'Умеренный',
        description: 'Ветер уже мнения имеет — и активно его высказывает',
    },
    {
        max: 12,
        label: 'Свежий',
        description: 'На велосипеде в одну сторону легко, в другую — уже работа',
    },
    {
        max: 17,
        label: 'Сильный',
        description: 'Ветер решил что он тут главный. Не спорь',
    },
    {
        max: Infinity,
        label: 'Шторм',
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
    const level = getWindLevel(speed)
    return (
        <div className={`${stl.wind} ${stl.card} ${small ? stl.card_small : ''}`}>
            <div className={stl.card__icon}>
                <LocationIcon className={stl.wind__icon} style={{'--dir': dir + 'deg'} as React.CSSProperties}/>
            </div>

            <p className={stl.card__title}>{level.label}: ветер {dirString} {speedMeters}м/с</p>
            <p className={stl.card__subtitle}>Порывы: {gustMeters}м/с</p>
            <p className={stl.card__tag}>{level.description}</p>
        </div>
    )
}