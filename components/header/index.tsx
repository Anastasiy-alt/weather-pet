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
        if (!coords || !currentCoords) return
        if (coords?.lat !== currentCoords?.lat || coords?.lon !== currentCoords?.lon) {
            setVisible(true)
        } else {
            setVisible(false)
        }
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
                            <Location city={'Я тут'}/>
                        </button>
                    }
                </div>
                <div className={stl.header__navOuter}>
                    <nav className={stl.header__nav}>
                        <Link className={stl.header__link} href="/about">О проекте</Link>
                        <Link className={stl.header__link} href="/where-i-am">Где я?</Link>
                        <Link className={stl.header__link} href="/day">Погода на 15 дней</Link>
                    </nav>
                    <button className={stl.header__searchIcon} onClick={toggle}>
                        <IconSearch/>
                    </button>
                    <Burger>
                        <Link className={stl.header__link} href="/about">О проекте</Link>
                        <Link className={stl.header__link} href="/where-i-am">Где я?</Link>
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