import stl from './small.module.sass'
import Sun from '@/assets/icons/weather/clear-day.svg'
import Cloud from '@/assets/icons/cloud.svg'

interface TempCardProps {
    fact: number
    feels: number
    small?: boolean
}

export default function TempFeels({fact, feels, small}: TempCardProps) {
    return (
        <div className={`${stl.tempFeels} ${stl.card} ${small ? stl.card_small : ''}`}>
            <div className={`${stl.tempFeels__icon} ${stl.card__icon}`}>
                <Sun className={stl.tempFeels__sun}/>
                <Cloud className={stl.tempFeels__cloud}/>
            </div>
            <p className={stl.card__title}>Температура {fact}°</p>
            <p className={stl.card__subtitle}>Ощущается как {feels}°</p>
            <p className={stl.card__tag}>
                {
                    feels === fact ?
                        <>Ощущается как фактическая</>
                        : <>По ощущениям
                            {feels - fact > 0 ? <> теплее</> : <> холоднее</>}
                            на {(fact - feels).toFixed(1)}°
                        </>
                }
            </p>
        </div>
    )
}
