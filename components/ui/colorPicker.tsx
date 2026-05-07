'use client'
import stl from './ui.module.sass'
import {useTheme} from "next-themes";


export default function ColorPicker() {
    const {theme, setTheme} = useTheme()
    return (
        <>
            {
                theme &&
                <label className={stl.color}>
                    <input checked={theme === 'dark'} id='color-picker' onChange={(value) => {
                        setTheme(value.target.checked ? 'dark' : 'light')
                    }} className={stl.color__input} type="checkbox"/>
                    <span className={stl.color__check}></span>
                </label>
            }
        </>
    )
}