'use client'
import stl from './search.module.sass'
import {useSearchStore} from "@/store/search";
import {usePathname, useRouter} from "next/navigation";
import {useWeatherStore} from "@/store/weather";
import {useGeoStore} from "@/store/geolocation";
import {CityResult} from "@/types";
import Link from "next/link";
import {useEffect} from "react";

interface HistoryItem {
    city: string
    lat: number
    lon: number
}

export default function SearchHistory() {
    const {history, clearHistory, setSelect, init} = useSearchStore()
    const router = useRouter()
    const load = useWeatherStore(s => s.load)
    const {setLocation} = useGeoStore()
    const pathname = usePathname()
    useEffect(() => {
        init()
    }, []);

    async function handleSelect(city: string) {
        const loc = await setSelect(city)
        if (!loc) return
        if (pathname === '/') {
            const params = new URLSearchParams()

            params.set('lat', loc.lat.toString())
            params.set('lon', loc.lon.toString())

            router.replace(`/?${params.toString()}`, {
                scroll: false
            })
        }
        await load(loc.lat, loc.lon)
        setLocation({
            lat: loc.lat,
            lon: loc.lon
        })
    }

    return (
        <>
            {
                (history && history.length) > 0 &&
                <div className={stl.history}>
                    <p className={stl.history__title}>Искали ранее: </p>
                    <ul className={stl.history__list}>
                        {
                            history.map((i) => (
                                <li key={i.city} onClick={() => handleSelect(i.city)}>
                                    <Link href={'/'} className={stl.history__item}>
                                        {i.city}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <button className={stl.history__clear} onClick={clearHistory}>очистить</button>
                </div>

            }
        </>
    )
}