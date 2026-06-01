import stl from './small.module.sass'
import Sun from '@/assets/icons/weather/clear-day.svg'

const UV_LEVELS = {
    0: {label: 'Нет', description: 'Можно смело гулять без защиты', color: 'var(--green)'},
    1: {label: 'Низкий', description: 'Всё спокойно, крем не нужен', color: 'var(--green)'},
    2: {label: 'Низкий', description: 'Почти безопасно, но крем не помешает', color: 'var(--green)'},
    3: {label: 'Умеренный', description: 'Захвати крем, если надолго выходишь', color: 'var(--yellow)'},
    4: {label: 'Умеренный', description: 'Солнце уже чувствуется, намажь крем', color: 'var(--yellow)'},
    5: {label: 'Умеренный', description: 'Лучше не забывать про SPF', color: 'var(--yellow)'},
    6: {label: 'Высокий', description: 'Шляпа и крем — твои лучшие друзья сегодня', color: 'var(--orange)'},
    7: {label: 'Высокий', description: 'Серьёзно, надень шляпу и возьми SPF 30+', color: 'var(--orange)'},
    8: {label: 'Очень высокий', description: 'Старайся не торчать на солнце в середине дня', color: 'var(--red)'},
    9: {label: 'Очень высокий', description: 'Лучше остаться в тени — солнце злое', color: 'var(--red)'},
    10: {label: 'Экстремальный', description: 'Солнце сегодня не шутит — береги кожу', color: 'var(--violet)'},
} as const

export default function UVindex({uv, small}: { uv: number, small?: boolean }) {
    const level = UV_LEVELS[uv as keyof typeof UV_LEVELS] ?? {
        label: 'Экстремальный',
        description: 'Солнце сегодня не шутит — береги кожу',
        color: 'var(--violet)'
    }
    return (
        <div className={`${stl.uv} ${small ? stl.card_small : ''} ${stl.card}`} style={{'--c': level.color} as React.CSSProperties}>
            <Sun className={`${stl.uv__icon} ${stl.card__icon}`} style={{'--i': uv / 10} as React.CSSProperties}/>
            <p className={stl.card__title}>УФ-индекс {uv}</p>
            <p className={stl.card__subtitle}>{level.label}</p>
            <p className={stl.card__tag}>{level.description}</p>
        </div>
    )
}
