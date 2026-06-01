import {Area, AreaChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis} from 'recharts'
import {Hour} from '@/types'
import WeatherIcon from '@/components/weather/icon'
import stl from '@/components/day/day.module.sass'
import {useEffect, useRef, useState} from 'react'
import {useDayStore} from '@/store/day'
import {convertWindSpeed, tempHue} from '@/lib/weatherUtils'
import Toggle from "@/components/ui/toggle";

interface TickProps {
    x: string | number
    y: string | number
    payload: {
        value: string
    }
}

function IconTick({x, y, payload}: TickProps) {
    return (
        <foreignObject x={Number(x) - 16} y={Number(y) - 50} width={32} height={32}>
            <WeatherIcon classCustom={stl.chart__icon} name={payload.value}/>
        </foreignObject>
    )
}

function TimeTick({x, y, payload}: TickProps) {
    return (
        <text x={Number(x)} y={Number(y) + 8} textAnchor="middle" className={stl.chart__time}>
            {payload.value.slice(0, 5)}
        </text>
    )
}

function CustomDotTemp({cx, cy, payload, index}: {
    cx?: number | string
    cy?: number | string
    payload?: { temp: number; value: string }
    index: number
}) {
    if (!cx || !cy || !payload) return null
    return (
        <g className={`${stl.chart__dot} ${'chart-dot-' + index}`}>
            <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="var(--white)" stroke="var(--blue)"
                    strokeWidth={2}/>
            <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                  fontWeight={600}
                  fill={tempHue(payload.temp)}>
                {Math.round(payload.temp) > 0 ? `+${Math.round(payload.temp)}` : Math.round(payload.temp)}°
            </text>
        </g>
    )
}

function CustomDotFeels({cx, cy, payload, index}: {
    cx?: number | string
    cy?: number | string
    payload?: { feelslike: number; value: string }
    index: number
}) {
    if (!cx || !cy || !payload) return null
    return (
        <g className={`${stl.chart__dot} ${'chart-dot-' + index}`}>
            <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="var(--white)" stroke="var(--blue)"
                    strokeWidth={2}/>
            <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                  fontWeight={600}
                  fill={tempHue(payload.feelslike)}>
                {Math.round(payload.feelslike) > 0 ? `+${Math.round(payload.feelslike)}` : Math.round(payload.feelslike)}°
            </text>
        </g>
    )
}

function CustomDotWind({cx, cy, payload, index}: {
    cx?: number | string
    cy?: number | string
    payload?: { windspeed: number; value: string }
    index: number
}) {
    if (!cx || !cy || !payload) return null
    return (
        <g className={`${stl.chart__dot} ${'chart-dot-' + index}`}>
            <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="var(--white)" stroke="var(--black)"
                    strokeWidth={2}/>
            <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                  fontWeight={600}
                  fill={`var(--black)`}>
                {convertWindSpeed(payload.windspeed)}
            </text>
        </g>
    )
}

function CustomDotWindGust({cx, cy, payload, index}: {
    cx?: number | string
    cy?: number | string
    payload?: { windgust: number; value: string }
    index: number
}) {
    if (!cx || !cy || !payload) return null
    return (
        <g className={`${stl.chart__dot} ${'chart-dot-' + index}`}>
            <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="var(--white)" stroke="var(--gray)"
                    strokeWidth={2}/>
            <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                  fontWeight={600}
                  fill={`var(--gray)`}>
                {convertWindSpeed(payload.windgust)}
            </text>
        </g>
    )
}

function CustomDotHumidity({cx, cy, payload, index}: {
    cx?: number | string
    cy?: number | string
    payload?: { humidity: number; value: string }
    index: number
}) {
    if (!cx || !cy || !payload) return null
    return (
        <g className={`${stl.chart__dot} ${'chart-dot-' + index}`}>
            <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="var(--white)" stroke="var(--blue)"
                    strokeWidth={2}/>
            <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                  fontWeight={600}
                  fill={`var(--blue)`}>
                {Math.round(payload.humidity)}%
            </text>
        </g>
    )
}

function CustomDotUV({cx, cy, payload, index}: {
    cx?: number | string
    cy?: number | string
    payload?: { uvindex: number; value: string }
    index: number
}) {
    if (!cx || !cy || !payload) return null
    return (
        <g className={`${stl.chart__dot} ${'chart-dot-' + index}`}>
            <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="var(--white)"
                    stroke={getUVColor(payload.uvindex)}
                    strokeWidth={2}/>
            <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                  fontWeight={600}
                  fill={getUVColor(payload.uvindex)}>
                {payload.uvindex}
            </text>
        </g>
    )
}

function getUVGradientStops(data: Hour[]) {
    return data.map((d, i) => ({
        offset: `${(i / (data.length - 1)) * 100}%`,
        color: getUVColor(d.uvindex)
    }))
}

function getUVColor(value: number) {
    if (value <= 2) return 'var(--green)'
    if (value <= 5) return 'var(--yellow)'
    if (value <= 7) return 'var(--orange)'
    if (value <= 10) return 'var(--red)'
    return 'var(--violet)'
}

export default function Chart({data}: { data: Hour[] }) {
    const chart = useRef<HTMLDivElement>(null)
    const {activeHourIndex, setActiveHourIndex} = useDayStore()
    const [showWind, setShowWind] = useState(false)
    const [showPrecip, setShowPrecip] = useState(false)
    const [showFeels, setShowFeels] = useState(false)
    const [showUV, setShowUV] = useState(false)
    const [showHumidity, setShowHumidity] = useState(false)
    const [showTemp, setShowTemp] = useState(true)
    const [activeX, setActiveX] = useState<number | null>(null)


    function setActiveDot(i: number | undefined) {
        chart.current?.querySelectorAll('.' + stl.chart__dot).forEach(el => el.classList.remove(stl.chart__dot_active))
        if (typeof i === 'number') {
            chart.current?.querySelectorAll(`.chart-dot-${i}`)?.forEach((i) => i.classList.add(stl.chart__dot_active))
        }

    }

    useEffect(() => {
        setActiveDot(activeHourIndex)
    }, [activeHourIndex])

    return (
        <>
            <div className={stl.chartToggles}>
                <Toggle checked={showTemp}
                        onChange={(checked) => setShowTemp(checked)}
                        small={true}
                        text={'Температура, C°'}/>
                <Toggle checked={showFeels}
                        onChange={(checked) => setShowFeels(checked)}
                        small={true}
                        text={'Ощущается как, C°'}/>
                <Toggle checked={showWind}
                        onChange={(checked) => setShowWind(checked)}
                        small={true}
                        text={'Ветер, м/с'}/>
                <Toggle checked={showPrecip}
                        onChange={(checked) => setShowPrecip(checked)}
                        small={true}
                        text={'Осадки, мм'}/>
                <Toggle checked={showHumidity}
                        onChange={(checked) => setShowHumidity(checked)}
                        small={true}
                        text={'Влажность, %'}/>
                <Toggle checked={showUV}
                        onChange={(checked) => setShowUV(checked)}
                        small={true}
                        text={'УФ-индекс'}/>

            </div>

            <div className={stl.chart} ref={chart}>
                {activeX !== null && (
                    <div
                        className={stl.chart__refLine}
                        style={{left: activeX}}
                    />
                )}
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{top: 32, right: 32, left: 32, bottom: 0}}
                        onClick={(data) => {
                            const i = data.activeTooltipIndex
                            if (i !== undefined && i !== null) {
                                const index = Number(i)
                                setActiveHourIndex(index)
                                setActiveX(data.activeCoordinate?.x ?? null)
                            }
                        }}
                    >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--light-blue)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--blue)" stopOpacity={0}/>
                            </linearGradient>

                            <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--light-blue)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--gray)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorUV" x1="0" y1="0" x2="1" y2="0"> {/* x2="1" — горизонтальный */}
                                {getUVGradientStops(data).map((stop, i) => (
                                    <stop key={i} offset={stop.offset} stopColor={stop.color}/>
                                ))}
                            </linearGradient>
                        </defs>
                        <XAxis xAxisId="icons"
                               dataKey="icon"
                               orientation="top"
                               tick={IconTick}
                               axisLine={false}
                               tickLine={false}
                               height={32}
                               interval={0}/>
                        <XAxis xAxisId="time"
                               dataKey="datetime"
                               height={20}
                               tick={TimeTick}
                               axisLine={false}
                               tickLine={false}
                               interval={0}/>

                        {
                            showTemp && (
                                <Area type="monotone" dot={CustomDotTemp} activeDot={{className: 'chart__hover-dot'}}
                                      dataKey="temp"
                                      strokeWidth={3} stroke="var(--blue)" fill="url(#colorTemp)" name={'Температура'}
                                      unit={'°'}/>
                            )
                        }
                        {
                            showHumidity && (
                                <Area type="monotone" dot={CustomDotHumidity} activeDot={{className: 'chart__hover-dot'}}
                                      dataKey="humidity" name={'Влажность'} unit={'%'}
                                      strokeWidth={3} stroke="var(--light-blue)" fill="transparent"/>
                            )
                        }
                        {
                            showUV && (
                                <Area type="monotone" dot={CustomDotUV} activeDot={{className: 'chart__hover-dot'}}
                                      dataKey="uvindex" name={'УФ-индекс'} stroke="url(#colorUV)"
                                      strokeWidth={3} fill="transparent"/>
                            )
                        }
                        {showFeels && (
                            <Area type="monotone" dot={CustomDotFeels} activeDot={{className: 'chart__hover-dot'}}
                                  dataKey="feelslike"
                                  strokeWidth={3} stroke="var(--blue)" fill="url(#colorTemp)" name={'Ощущается как'}
                                  unit={'°'}/>
                        )}
                        {
                            showPrecip && (
                                <Bar dataKey="precip"
                                     barSize={20}
                                     fill="var(--dark-blue)"
                                     unit={' мм'}
                                     name={'Осадки'}
                                     isAnimationActive={true}/>
                            )
                        }


                        {
                            showWind && (
                                <>
                                    <Area type="monotone" dot={CustomDotWind} activeDot={{className: 'chart__hover-dot'}}
                                          dataKey="windspeed" name={'Сокорость ветра'} unit={' м/с'}
                                          strokeWidth={3} stroke="var(--gray)" fill="url(#colorWind)"/>
                                    <Area type="monotone" activeDot={{className: 'chart__hover-dot'}}
                                          dataKey="windgust" name={'Порывы ветра'} unit={' м/с'}
                                          dot={CustomDotWindGust}
                                          strokeWidth={3} stroke="var(--gray)" strokeOpacity={0.5} fill="transparent"/>
                                </>
                            )
                        }

                        <Tooltip animationDuration={0}
                                 axisId={'time'}
                                 labelFormatter={(value) => value.slice(0, 5)}
                                 formatter={(value, name) =>
                                     (typeof value === 'number' && (typeof name === 'string' && name?.includes('ветра'))) ? convertWindSpeed(value) : value}/>
                        <CartesianGrid strokeDasharray="8 6" vertical={false} stroke={'var(--light-gray)'}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

        </>
    )
}
