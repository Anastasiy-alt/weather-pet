'use client'
import stl from './offline.module.sass'
import {useEffect} from "react";


export default function OfflinePage() {
    useEffect(() => {
        const header = document.querySelector('header')
        if (header) header.style.display = 'none'
        return () => {
            if (header) header.style.display = ''
        }
    }, [])

    return (
        <div className="offline-page"style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            border: '3px solid blue'
        }}>
            <div className={stl.page}>
                <h1 className={stl.page__title}>Нет соединения</h1>
                <p>tuczdfhzhhj</p>
            </div>

        </div>
    )
}