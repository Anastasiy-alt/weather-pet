import stl from './small.module.sass'
import WeatherIcon from '@/components/weather/icon'
import RainAnimation, {RainAnimationRef} from './rain'
import {useRef} from 'react'

const PRECIP_LABELS = {
    prob: {
        label: 'Вероятность',
        hint: (v: number) =>
            v === 0 ? 'Дождя не ожидается' :
                v < 20 ? 'Скорее всего обойдётся' :
                    v < 50 ? 'Может капнуть' :
                        v < 70 ? 'Лучше взять зонт' :
                            v < 90 ? 'Почти наверняка промокнешь' :
                                'Зонт обязателен',
    },
    type: {
        label: 'Тип осадков',
        hint: (types: string[] | null, prob?: number) => {
            if (!types || types.length === 0) {
                if (prob && prob > 0) return 'Возможны осадки'
                return 'Осадков нет'
            }
            const map: Record<string, string> = {
                rain: 'Дождь',
                snow: 'Снег',
                freezingrain: 'Ледяной дождь',
                ice: 'Лёд',
            }
            return types.map(t => map[t] ?? t).join(', ')
        }
    }
} as const

export default function PrecipSmall({precipprob, preciptype, small}: {
    precipprob: number,
    preciptype: string[],
    small?: boolean
}) {
    const rainRef = useRef<RainAnimationRef>(null)
    return (
        <div className={`${stl.card} ${small ? stl.card_small : ''} ${stl.precip} ${precipprob > 0 ? '' : stl.precip_sun}`}
             onMouseEnter={() => rainRef.current?.start()}
             onMouseLeave={() => rainRef.current?.stop()}>
            <RainAnimation ref={rainRef} probability={precipprob}/>
            {preciptype && preciptype.length > 0 ? (
                preciptype.map((item) => (
                    <div className={stl.card__icon} key={item}>
                        <WeatherIcon name={item}/>
                    </div>
                ))
            ) : precipprob > 0 ? (
                <div className={stl.card__icon}>
                    <WeatherIcon name="rain"/>
                </div>
            ) : <div className={stl.card__icon}>
                <WeatherIcon name={'clear-day'}/>
            </div>}
            <p className={`${stl.card__title} ${stl.precip__title}`}>{PRECIP_LABELS.prob.label} {precipprob}%</p>
            <p className={stl.card__subtitle}>{PRECIP_LABELS.type.hint(preciptype, precipprob)}</p>
            <p className={stl.card__tag}>{PRECIP_LABELS.prob.hint(precipprob)}</p>
        </div>
    )
}
