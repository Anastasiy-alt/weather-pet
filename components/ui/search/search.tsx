'use client'

import stl from './search.module.sass'
import {useState} from 'react'
import {useCitySearch} from '@/hooks/useSearch'
import {useWeatherStore} from '@/store/weather'
import {CityResult} from '@/types'
import {usePathname, useRouter} from "next/navigation";
import {useSearchStore} from "@/store/search";
import {useGeoStore} from "@/store/geolocation";
import Link from "next/link";
import SearchLoader from "@/components/ui/search/loader";

interface HistoryItem {
    city: string
    lat: number
    lon: number
}

export default function Search() {
    const [query, setQuery] = useState('')
    const {results, loading} = useCitySearch(query)
    const load = useWeatherStore(s => s.load)
    const {setSelect} = useSearchStore()
    const router = useRouter()
    const pathname = usePathname()
    const {setLocation} = useGeoStore()

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
        setQuery('')
    }

    return (
        <div className={stl.searchWrap}>
            <form className={stl.search} onSubmit={e => e.preventDefault()}>
                <input
                    className={stl.search__input}
                    type="text"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                    }}

                />
                <span
                    className={`${stl.search__inputSpan} ${query.length > 0 ? stl.search__inputSpan_open : ''}`}>Введите город</span>
                {loading && <span className={stl.search__loader}><SearchLoader/></span>}
            </form>
            {!loading && results.length > 0 && (
                <ul className={stl.search__dropdown}>
                    {results.map((city) => (
                        <li onClick={() => handleSelect(city)}
                            key={city.place_id} className={stl.search__itemOut}>
                            <Link href={'/'} className={stl.search__item}>
                                <span className={stl.search__city}>{city.city}</span>
                                <span className={stl.search__country}>{city.address_line2}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {
                !loading && query.length > 0 && results.length === 0 && (
                    <p className={stl.search__notFound}>Синоптики таких мест не&nbsp;знают</p>
                )
            }
        </div>
    )
}