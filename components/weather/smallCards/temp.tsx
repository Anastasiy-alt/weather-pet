import stl from './cards.module.sass'

interface TempCardProps {
    tempmax: number
    tempmin: number
}

export default function TempRange({tempmax, tempmin}: TempCardProps) {
    return (
        <div className={`${stl.temp} ${stl.card}`}>
            <div className={stl.temp__icon}>
                <div className={`${stl.temp__arrow} ${stl.temp__arrow_up}`}>
                </div>
                <div className={`${stl.temp__arrow} ${stl.temp__arrow_down}`}>
                </div>
            </div>
            <p className={stl.card__title}>
                <span>Максимум {tempmax}°</span>
                <br/>
                <span>Минимум {tempmin}°</span>
            </p>
            <p className={stl.card__tag}>
                Разница температур за день составляет {(tempmax - tempmin).toFixed(1)}°
            </p>
        </div>
    )
}