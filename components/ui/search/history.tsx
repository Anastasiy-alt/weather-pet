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

    function handleSelect(city: CityResult | HistoryItem) {
        if (pathname === '/') {
            const params = new URLSearchParams()
            params.set('lat', city.lat.toString())
            params.set('lon', city.lon.toString())
            router.replace(`/?${params.toString()}`, {scroll: false})
        }
        setSelect(city)
        load(city.lat, city.lon).then()
        setLocation({lat: city.lat, lon: city.lon})

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
                                <li key={i.city} onClick={() => handleSelect(i)}>
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