'use client'
import stl from './header.module.sass'
import Link from "next/link";
import Burger from "@/components/header/burger";
import Sun from '@/assets/icons/weather/clear-day.svg'
import Search from "@/components/ui/search";
import IconSearch from '@/assets/icons/search.svg'
import {useSearchStore} from "@/store/search";
import Modal from "@/components/ui/modal";


export default function HeaderApp() {
    const {open, toggle, setClose} = useSearchStore()


    return (
        <>
        <header className={`${stl.header} ${open ? stl.header_open : ''}`}>
            <Link className={stl.header__icon} href="/">
               <Sun />
            </Link>
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
                <Search />
            </Modal>

    </>
    )
}