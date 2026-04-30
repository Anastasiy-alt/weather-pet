'use client'

import stl from './weather.module.sass'
import {useEffect, useState} from 'react'
import Sun from '@/assets/icons/weather/clear-day.svg'


interface SunArcProps {
    sunrise: string
    sunset: string
    sunriseEpoch: number
    sunsetEpoch: number
    now?: Date
}

export default function SunArc({sunrise, sunset, sunriseEpoch, sunsetEpoch, now}: SunArcProps) {
    function toMin(t: string) {
        const [h, m] = t.split(':').map(Number)
        return h * 60 + m
    }

    const srMin = toMin(sunrise)
    const ssMin = toMin(sunset)
    const totalSec = sunsetEpoch - sunriseEpoch
    const sunDay = {
        hours: Math.floor(totalSec / 3600),
        minutes: Math.floor((totalSec % 3600) / 60)
    }
    let nowMin
    let progress
    if (now) {
        nowMin = now.getHours() * 60 + now.getMinutes()
        progress = Math.min(1, Math.max(0, (nowMin - srMin) / (ssMin - srMin)))
    } else {
        progress = 1
    }

    const [animatedProgress, setAnimatedProgress] = useState(0)

    useEffect(() => {
        const duration = 2000
        const start = performance.now()

        const tick = (now: number) => {
            const elapsed = now - start
            const t = Math.min(elapsed / duration, 1)
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
            setAnimatedProgress(eased * progress)
            if (t < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    }, [])

    const cx = 135, cy = 115, r = 110
    const circumference = Math.PI * r

    function pt(angle: number): [number, number] {
        return [cx + r * Math.cos(angle), cy - r * Math.sin(angle)]
    }

    const [sx, sy] = pt(Math.PI)
    const [ex, ey] = pt(0)
    const arcD = `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`

    const dashOffset = circumference * (1 - animatedProgress)
    const sunA = Math.PI - animatedProgress * Math.PI
    const [sunX, sunY] = pt(sunA)

    return (
        <div className={`${stl.sun} ${stl.card}`}>
            <svg className={stl.sun__main} viewBox="0 0 270 120" width="100%" height="100%">
                <path
                    className={stl.sun__strokeGray}
                    d={arcD}
                    fill="none"
                    strokeWidth="2"
                    strokeDasharray="3 5"
                    strokeLinecap="round"
                />
                <path
                    d={arcD}
                    fill="none"
                    className={stl.sun__strokeYellow}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                />
                <g transform={`translate(${sunX - 12}, ${sunY - 12})`}>
                    <circle cx={12} cy={12} r="5" strokeWidth="2" fill="" className={stl.sun__strokeYellow}/>
                </g>
                {
                    now ?
                        <text x={135} y={90} className={stl.sun__percent} textAnchor="middle" fontWeight={500}>
                            {Math.round(animatedProgress * 100)}%
                        </text>
                        :
                        <foreignObject x={90} y={20} width={90} height={90}>
                            <Sun className={stl.sun__sunIcon}/>
                        </foreignObject>
                }
            </svg>
            <div className={stl.sun__text}>
                <p>{sunrise.slice(0, 5)}</p>
                <p className={stl.sun__day}><span>Световой день</span><span>{sunDay.hours} ч {sunDay.minutes} мин</span>
                </p>
                <p>{sunset.slice(0, 5)}</p>
            </div>
        </div>
    )
}