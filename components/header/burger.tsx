'use client'
import {useBurgerStore} from "@/store/burger";
import stl from './header.module.sass'
import {ReactNode, useEffect} from "react";
import {usePathname} from "next/navigation";

export default function Burger({
                                   children,
                               }: Readonly<{
    children: ReactNode;
}>) {

    const {open, toggle, setClose} = useBurgerStore()
    const pathname = usePathname()

    useEffect(() => {
        setClose()
    }, [pathname])

    return (
        <>
            <button className={`${stl.header__burger} ${open ? stl.header__burger_active : ''}`} onClick={toggle}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`${stl.burger} ${open ? stl.burger_active : ''}`}>
                {children}
            </div>
        </>

    )
}