'use client'
import stl from './offline.module.sass'
import {useEffect} from "react";
import Moon from "@/assets/icons/weather/clear-night.svg";
import Cloud from "@/assets/icons/cloud.svg";
import Link from "next/link";

export default function OfflinePage() {
    useEffect(() => {
        const header = document.querySelector('header')
        if (header) header.style.display = 'none'
        return () => {
            if (header) header.style.display = ''
        }
    }, [])

    return (
        <div className="offline-page">
            <div className={stl.page}>
                <div className={stl.page__block}>
                    <Moon className={`${stl.page__icon} ${stl.page__icon_moon}`}/>
                    <Cloud className={`${stl.page__icon} ${stl.page__icon_cloud}`}/>
                </div>
                <h1 className={stl.page__title}>OFF</h1>
                <p className={stl.page__sub}>Без интернета погоду не покажем,<br/>но можем посочувствовать</p>
                <Link href="/" className={stl.page__link}>
                    Обновить, вдруг повезёт
                </Link>
            </div>
        </div>
    )
}