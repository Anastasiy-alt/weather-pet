import stl from "./cards.module.sass";
import Sun from '@/assets/icons/weather/clear-day.svg'

const UV_LEVELS = {
    0: {label: 'Нет', description: 'Можно смело гулять без защиты', color: '#72b01d'},
    1: {label: 'Низкий', description: 'Всё спокойно, крем не нужен', color: '#72b01d'},
    2: {label: 'Низкий', description: 'Почти безопасно, но крем не помешает', color: '#72b01d'},
    3: {label: 'Умеренный', description: 'Захвати крем, если надолго выходишь', color: '#FFB703'},
    4: {label: 'Умеренный', description: 'Солнце уже чувствуется, намажь крем', color: '#FFB703'},
    5: {label: 'Умеренный', description: 'Лучше не забывать про SPF', color: '#FFB703'},
    6: {label: 'Высокий', description: 'Шляпа и крем — твои лучшие друзья сегодня', color: '#FB8500'},
    7: {label: 'Высокий', description: 'Серьёзно, надень шляпу и возьми SPF 30+', color: '#ae2012'},
    8: {label: 'Очень высокий', description: 'Старайся не торчать на солнце в середине дня', color: '#ae2012'},
    9: {label: 'Очень высокий', description: 'Лучше остаться в тени — солнце злое', color: '#ae2012'},
    10: {label: 'Экстремальный', description: 'Солнце сегодня не шутит — береги кожу', color: '#7b2cbf'},
} as const
export default function UVindex({uv}: { uv: number }) {
    const level = UV_LEVELS[uv as keyof typeof UV_LEVELS] ?? {
        label: 'Экстремальный',
        description: 'Солнце сегодня не шутит — береги кожу',
        color: '#7b2cbf'
    }
    return (
        <div className={`${stl.uv} ${stl.card}`} style={{'--c': level.color} as React.CSSProperties}>
            <Sun className={stl.uv__icon} style={{'--i': uv / 10} as React.CSSProperties}/>
            <p className={stl.card__title}>УФ-индекс {uv}</p>
            <p className={stl.card__subtitle}>{level.label}</p>
            <p className={stl.card__tag}>{level.description}</p>
        </div>
    )
}