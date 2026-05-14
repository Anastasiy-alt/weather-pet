import {ReactNode, useRef} from 'react'
import stl from './ui.module.sass'

interface AccordionProps {
    title: string
    icon?: ReactNode
    color?: string
    children: ReactNode
}

export default function Accordion({title, icon, color, children}: AccordionProps) {
    const ref = useRef<HTMLDivElement>(null)

    const toggle = () => {
        ref.current?.classList.toggle(stl.accordion_open)
    }

    return (
        <div
            ref={ref}
            className={stl.accordion}
            style={color ? {outline: `2px solid ${color}`} : undefined}
            onClick={toggle}
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
