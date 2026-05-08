'use client'
import stl from './header.module.sass'
import {useTheme} from "@teispace/next-themes";
import Link from "next/link";
import Burger from "@/components/header/burger";
import Sun from '@/assets/icons/weather/clear-day.svg'
import Moon from '@/assets/icons/weather/clear-night.svg'
import IconSearch from '@/assets/icons/search.svg'
import Location from "@/components/ui/location";
import {useWeatherStore} from "@/store/weather";
import {useEffect, useRef} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {useBackHomeStore} from "@/store/backHome";
import {useGeoStore} from "@/store/geolocation";

type Coords = { lat: number; lon: number }

function coordsAreEqual(a: Coords, b: Coords, precision = 2): boolean {
    const factor = Math.pow(10, precision)
    return (
        Math.round(a.lat * factor) === Math.round(b.lat * factor) &&
        Math.round(a.lon * factor) === Math.round(b.lon * factor)
    )
}

export default function HeaderApp() {
    const load = useWeatherStore(s => s.load)
    const {reset, coords, currentCoords} = useGeoStore()
    const {visible, setVisible} = useBackHomeStore()
    const {theme} = useTheme()
    const sunRef = useRef<HTMLSpanElement>(null)
    const moonRef = useRef<HTMLSpanElement>(null)
    const nodeRef = theme === 'dark' ? moonRef : sunRef

    const handleBackHome = () => {
        if (!currentCoords) return
        reset()
        load(currentCoords.lat, currentCoords.lon).then()
        setVisible(false)
    }
    useEffect(() => {
        if (!coords || !currentCoords) return
        setVisible(!coordsAreEqual(coords, currentCoords))
    }, [coords, currentCoords])

    return (
        <>
            <header className={stl.header}>
                <div className={stl.header__block}>
                    <div className={stl.header__navOuter}>
                        <Link className={stl.header__icon} href="/">
                            <SwitchTransition mode="out-in">
                                <CSSTransition
                                    key={theme ?? 'light'}
                                    timeout={350}
                                    nodeRef={nodeRef}
                                    classNames={{
                                        enter: stl.iconEnter,
                                        enterActive: stl.iconEnterActive,
                                        exit: stl.iconExit,
                                        exitActive: stl.iconExitActive,
                                    }}
                                >
                                <span ref={nodeRef}>
                                    {theme === 'dark' ? <Moon/> : <Sun/>}
                                </span>
                                </CSSTransition>
                            </SwitchTransition>
                        </Link>
                        {
                            visible &&
                            <button onClick={handleBackHome} className={stl.header__home}>
                                <Location city={'Где я?'}/>
                            </button>
                        }
                    </div>
                    <div className={stl.header__navOuter}>
                        <nav className={stl.header__nav}>
                            <Link className={stl.header__link} href="/about">О проекте</Link>
                            <Link className={stl.header__link} href="/day">Погода на 15 дней</Link>
                        </nav>
                        <Link className={stl.header__searchIcon} href='/search'>
                            <IconSearch/>
                        </Link>
                        <Burger>
                            <Link className={stl.header__link} href="/about">О проекте</Link>
                            <Link className={stl.header__link} href="/day">Погода на 15 дней</Link>
                        </Burger>
                    </div>
                </div>

            </header>
        </>
    )
}