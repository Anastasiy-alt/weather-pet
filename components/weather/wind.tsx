import stl from './weather.module.sass'
import LocationIcon from '@/assets/icons/location.svg'

interface WindProps {
    dir: number
    speed: number
    gust: number
}

export default function Wind({dir, speed, gust}: WindProps) {
    const dirs: string[] = ['С', 'ССВ', 'СВ', 'ВСВ', 'В', 'ВЮВ', 'ЮВ', 'ЮЮВ', 'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ', 'З', 'ЗСЗ', 'СЗ', 'ССЗ']

    function getWindDirection(deg: number): string {
        const index = Math.round(deg / 22.5) % 16
        return dirs[index]
    }

    function convertSpeed(speed: number) {
        return speed * (1000 / 3600)
    }

    const dirString = getWindDirection(dir)
    const speedMeters = convertSpeed(speed)
    const gustMeters = convertSpeed(gust ? gust : speed)

    return (
        <div className={stl.wind}>
            <div className={stl.wind__round}>
                <div className={stl.wind__decoBlock}>
                    {dirs.map((item, i) => (
                        <div className={stl.wind__deco} key={i}
                             style={{'--i': i, '--total': dirs.length} as React.CSSProperties}/>
                    ))}
                </div>
                <LocationIcon className={stl.wind__arrow} style={{'--dir': dir + 'deg'} as React.CSSProperties}/>
            </div>
            <div className={stl.wind__dir}>
                <p className={stl.wind__dirTitle}>Ветер</p>
                <p>{dirString}</p>
                <p>{speedMeters}м/с</p>
                {gustMeters &&
                    <p className={stl.wind__dirGust}>Порывы до {gustMeters}м/с</p>}
            </div>
        </div>
    )
}