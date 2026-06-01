'use client'
import stl from './ui.module.sass'

interface ToggleProps {
    checked: boolean
    onChange: (checked: boolean) => void
    id?: string
    small?: boolean
    text?: string
}

export default function Toggle({checked, onChange, id, small, text}: ToggleProps) {
    return (
        <label className={`${stl.toggle} ${small ? stl.toggle_small : ''}`}>
            <span className={stl.toggle__box}>
                           <input
                               checked={checked}
                               id={id}
                               onChange={(e) => onChange(e.target.checked)}
                               className={stl.toggle__input}
                               type="checkbox"
                           />
            <span className={stl.toggle__check}></span>
            </span>
            <span className={stl.toggle__text}>{text}</span>
        </label>
    )
}
