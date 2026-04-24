import stl from './cards.module.sass'
import Cloud from '@/assets/icons/weather/cloudy.svg'

const CLOUD_LEVELS = {
    0: 'Ни облачка, чистое небо',
    10: 'Почти ясно, солнце светит вовсю',
    20: 'Лёгкая дымка, солнцу не мешает',
    30: 'Небольшая облачность',
    40: 'Облака есть, но солнце пробивается',
    50: 'Переменная облачность',
    60: 'Больше облаков чем солнца',
    70: 'Довольно пасмурно',
    80: 'Серое небо, солнца почти не видно',
    90: 'Плотные облака, солнце спряталось',
    100: 'Полная облачность, хмуро',
} as const

export default function Cloudy({percent}: { percent: number }) {
    function getCloudDescription(percent: number): string {
        const key = Math.round(percent / 10) * 10 as keyof typeof CLOUD_LEVELS
        return CLOUD_LEVELS[key] ?? CLOUD_LEVELS[100]
    }

    const description: string = getCloudDescription(percent) ?? ''
    return (
        <div className={`${stl.cloud} ${stl.card}`}>
            <div className={stl.cloud__block}>
                <Cloud className={stl.cloud__icon}/>
                <p className={stl.cloud__hiddenTitle}>{Math.round(percent)}%</p>
            </div>
            <p className={`${stl.cloud__title} ${stl.card__title}`}>
                Облачность <br/> {Math.round(percent)}%
            </p>
            <p className={stl.card__tag}>{description}</p>
        </div>
    )
}