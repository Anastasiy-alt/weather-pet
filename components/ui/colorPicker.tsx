'use client'
import {useTheme} from "@teispace/next-themes";
import Toggle from "./toggle";


export default function ColorPicker() {
    const {theme, setTheme} = useTheme()
    return (
        <>
            {
                theme &&
                <Toggle
                    checked={theme === 'dark'}
                    onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    id="color-picker"
                />
            }
        </>
    )
}