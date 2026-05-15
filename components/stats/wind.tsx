import stl from './stats.module.sass'
import LocationIcon from '@/assets/icons/location.svg'
import {WIND_DIRS, getWindDirection, convertWindSpeed} from '@/lib/weatherUtils'

interface WindProps {
    dir: number
    speed: number
    gust: number
}

export default function Wind({dir, speed, gust}: WindProps) {
    const dirString = getWindDirection(dir)
    const speedMeters = convertWindSpeed(speed)
    const gustMeters = convertWindSpeed(gust || speed)

    return (
        <div className={`${stl.wind} ${stl.card}`}>
            <div className={stl.wind__round}>
                <div className={stl.wind__decoBlock}>
                    {WIND_DIRS.map((item, i) => (
                        <div className={stl.wind__deco} key={i}
                             style={{'--i': i, '--total': WIND_DIRS.length} as React.CSSProperties}/>
                    ))}
                </div>
                <LocationIcon className={stl.wind__arrow} style={{'--dir': dir + 'deg'} as React.CSSProperties}/>
            </div>
            <div className={stl.wind__dir}>
                <p className={stl.wind__dirTitle}>Ветер</p>
                <p>{dirString} <br/>{speedMeters}м/с</p>
                {gustMeters &&
                    <p className={stl.wind__dirGust}>Порывы до {gustMeters}м/с</p>}
            </div>
        </div>
    )
}
