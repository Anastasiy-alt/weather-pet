'use client'

import {forwardRef, useImperativeHandle, useRef} from 'react'
import stl from './small.module.sass'
import Sun from '@/assets/icons/weather/clear-day.svg'

interface RainAnimationProps {
    probability: number
}

export interface RainAnimationRef {
    start: () => void
    stop: () => void
}

function RainAnimationComponent(
    {probability}: RainAnimationProps,
    ref: React.Ref<RainAnimationRef>
) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const wrapRef = useRef<HTMLDivElement>(null)
    const rafRef = useRef<number>(0)
    const runningRef = useRef(false)
    const dropsRef = useRef<{ x: number; y: number; len: number; speed: number; }[]>([])

    function spawnDrop(width: number) {
        return {
            x: Math.random() * width,
            y: -10,
            len: 6 + Math.random() * 8,
            speed: 2 + (probability / 100) * 4 + Math.random() * 2,
        }
    }

    function start() {
        const canvas = canvasRef.current
        const wrap = wrapRef.current
        if (!canvas || !wrap) return

        canvas.width = wrap.offsetWidth
        canvas.height = wrap.offsetHeight
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const maxDrops = Math.round(probability / 100 * 70)
        dropsRef.current = Array.from({length: maxDrops}, () => ({
            ...spawnDrop(canvas.width),
            y: Math.random() * canvas.height,
        }))

        runningRef.current = true

        function draw() {
            if (!runningRef.current || !canvas || !ctx) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const blue = wrap ? getComputedStyle(wrap).getPropertyValue('--light-blue').trim() : '#0000ff'
            const drops = dropsRef.current
            if (drops.length < maxDrops && Math.random() < 0.3) {
                drops.push(spawnDrop(canvas.width))
            }

            drops.forEach((d, i) => {
                ctx.beginPath()
                ctx.moveTo(d.x, d.y)
                ctx.lineTo(d.x - 1, d.y + d.len)
                ctx.strokeStyle = blue
                ctx.lineWidth = 2
                ctx.lineCap = 'round'
                ctx.stroke()
                d.y += d.speed
                if (d.y > canvas.height + 10) {
                    drops[i] = spawnDrop(canvas.width)
                }
            })

            rafRef.current = requestAnimationFrame(draw)
        }

        draw()
    }

    function stop() {
        runningRef.current = false
        cancelAnimationFrame(rafRef.current)
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
        dropsRef.current = []
    }

    useImperativeHandle(ref, () => ({start, stop}))

    return (
        <div ref={wrapRef} className={`${stl.rain} ${probability === 0 ? stl.rain_no : ''}`}>
            {
                probability === 0 ?
                    <Sun className={stl.rain__sun}/>
                    :
                    <canvas ref={canvasRef} className={stl.rain__canvas}/>
            }
        </div>
    )
}

export default forwardRef(RainAnimationComponent)
