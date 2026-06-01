'use client'
import {ReactNode, useState} from 'react'
import stl from './ui.module.sass'

interface AccordionProps {
    title: string
    icon?: ReactNode
    color?: string
    children: ReactNode
}

export default function Accordion({title, icon, color, children}: AccordionProps) {
    const [open, setOpen] = useState(false)

    return (
        <div
            className={`${stl.accordion} ${open ? stl.accordion_open : ''}`}
            style={color ? {outline: `2px solid ${color}`} : undefined}
            onClick={() => setOpen(o => !o)}
        >
            <p className={stl.accordion__title}>
                {icon}
                {title}
            </p>
            <div className={stl.accordion__content}>
                {children}
            </div>
        </div>
    )
}
