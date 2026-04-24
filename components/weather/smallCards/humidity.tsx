import stl from "./cards.module.sass";
import Water from '@/assets/icons/humidity.svg'

const HUMIDITY_LEVELS = [
    {
        max: 20,
        label: 'Очень сухо',
        description: 'Губы трескаются, статика везде',
    },
    {
        max: 30,
        label: 'Сухо',
        description: 'Кожа просит увлажнения',
    },
    {
        max: 40,
        label: 'Слегка сухо',
        description: 'Терпимо, но увлажнитель не помешает',
    },
    {
        max: 60,
        label: 'Комфортно',
        description: 'Самое то — дышится легко',
    },
    {
        max: 70,
        label: 'Нормально',
        description: 'Чуть влажновато, но жить можно',
    },
    {
        max: 80,
        label: 'Влажно',
        description: 'Волосы живут своей жизнью',
    },
    {
        max: 90,
        label: 'Очень влажно',
        description: 'Липко и душно, как в бане',
    },
    {
        max: 100,
        label: 'Невыносимо',
        description: 'Воздух как мокрое полотенце',
    },
] as const

export default function Humidity({percent}: { percent: number }) {

    function getHumidityLevel(humidity: number) {
        return HUMIDITY_LEVELS.find(l => humidity <= l.max) ?? HUMIDITY_LEVELS[HUMIDITY_LEVELS.length - 1]
    }

    const level = getHumidityLevel(percent)

    return (
        <div className={`${stl.card} ${stl.humidity}`} style={{'--i': percent / 100} as React.CSSProperties}>
            <Water className={`${stl.humidity__icon} ${stl.card__icon}`}/>
            <p className={`${stl.card__title} ${stl.humidity__title}`}>Влажность {Math.round(percent)}%</p>
            <p className={stl.card__subtitle}>{level.label}</p>
            <p className={stl.card__tag}>{level.description}</p>
        </div>
    )
}