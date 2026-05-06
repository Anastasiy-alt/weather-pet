'use client'
import stl from './header.module.sass'
import Link from "next/link";
import Burger from "@/components/header/burger";
import Sun from '@/assets/icons/weather/clear-day.svg'
import Search from "@/components/ui/search";
import IconSearch from '@/assets/icons/search.svg'
import {useSearchStore} from "@/store/search";
import Modal from "@/components/ui/modal";
import Location from "@/components/ui/location";
import {useWeatherStore} from "@/store/weather";
import {useEffect} from "react";
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
    const {open, toggle, setClose} = useSearchStore()
    const load = useWeatherStore(s => s.load)
    const {reset, coords, currentCoords} = useGeoStore()
    const {visible, setVisible} = useBackHomeStore()

    const handleBackHome = () => {
        if (!currentCoords) return
        reset()
        load(currentCoords.lat, currentCoords.lon).then()
        setVisible(false)
    }
    useEffect(() => {
        console.log(coords, currentCoords)
        if (!coords || !currentCoords) return
        setVisible(!coordsAreEqual(coords, currentCoords))
    }, [coords, currentCoords])

    return (
        <>
            <header className={`${stl.header} ${open ? stl.header_open : ''}`}>
                <div className={stl.header__navOuter}>
                    <Link className={stl.header__icon} href="/">
                        <Sun/>
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
                    <button className={stl.header__searchIcon} onClick={toggle}>
                        <IconSearch/>
                    </button>
                    <Burger>
                        <Link className={stl.header__link} href="/about">О проекте</Link>
                        <Link className={stl.header__link} href="/day">Погода на 15 дней</Link>
                    </Burger>
                </div>
            </header>
            <Modal open={open} close={() => setClose()} title={'Поиск погоды по городам'}>
                <Search/>
            </Modal>

        </>
    )
}