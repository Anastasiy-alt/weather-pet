import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';
import {Hour} from "@/types";
import WeatherIcon from "@/components/weather/ui/icon";
import stl from './day.module.sass'
import {mkdtemp} from "node:fs";

interface TickProps {
    x: string | number
    y: string | number
    payload: {
        value: string
    }
}

function tempHue(t: number) {
    if (t <= -10) return "#1368aa";
    if (t <= 0) return "#4091c9";
    if (t <= 10) return "#9dcee2";
    if (t <= 18) return "#72b01d";
    if (t <= 25) return "#FFB703";
    if (t <= 32) return "#FB8500";
    return "#ae2012";
}

export default function Recharts({data}: { data: Hour[] }) {
    function IconTick({x, y, payload}: TickProps) {
        return (
            <foreignObject x={Number(x) - 16} y={Number(y) - 32} width={32} height={32}>
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

    function CustomDot({cx, cy, payload}: {
        cx?: number | string;
        cy?: number | string;
        payload?: { temp: number; value: string }
    }) {
        if (!cx || !cy || !payload) return null
        return (
            <g>
                <circle className={stl.chart__circle} cx={cx} cy={cy} r={4} fill="#fff" stroke="#4091c9"
                        strokeWidth={2}/>
                <text className={stl.chart__tempText} x={cx} y={Number(cy) - 10} textAnchor="middle" fontSize={11}
                      fontWeight={600}
                      fill={tempHue(payload.temp)}>
                    {Math.round(payload.temp) > 0 ? `+${Math.round(payload.temp)}` : Math.round(payload.temp)}°
                </text>
            </g>
        )
    }

    return (
        <>
            <div className={stl.chart}>
                <ResponsiveContainer>
                    <AreaChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 30,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#9dcee2" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#4091c9" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            xAxisId="icons"
                            dataKey="icon"
                            orientation="top"
                            tick={IconTick}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                        />

                        <XAxis
                            xAxisId="time"
                            dataKey="datetime"
                            tick={TimeTick}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                        />
                        <Area type="monotone"
                              dot={CustomDot}
                              activeDot={{r: 6, fill: '#4091c9'}}
                              dataKey="temp"
                              strokeWidth={3}
                              stroke="#4091c9"
                              fill="url(#colorTemp)"/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}