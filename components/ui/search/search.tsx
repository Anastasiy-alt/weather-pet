'use client'

import stl from './search.module.sass'
import {useState} from 'react'
import {useCitySearch} from '@/hooks/useSearch'
import {useWeatherStore} from '@/store/weather'
import {usePathname, useRouter} from "next/navigation";
import {useSearchStore} from "@/store/search";
import {useGeoStore} from "@/store/geolocation";
import Link from "next/link";
import SearchLoader from "@/components/ui/search/loader";

export default function Search() {
    const [query, setQuery] = useState('')
    const {results, loading} = useCitySearch(query)
    const load = useWeatherStore(s => s.load)
    const {setSelect} = useSearchStore()
    const router = useRouter()
    const pathname = usePathname()
    const {setLocation} = useGeoStore()

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
            {!loading && results?.length > 0 && (
                <ul className={stl.search__dropdown}>
                    {results.map((city, i) => (
                        <li onClick={() => handleSelect(city.title.text)}
                            key={city.title.text + i} className={stl.search__itemOut}>
                            <Link href={'/'} className={stl.search__item}>
                                <span className={stl.search__city}>{city.title.text}</span>
                                <span className={stl.search__country}>
                                    {
                                        city.address.component.slice(0, city.address.component.length - 1).reverse().map((address, i) => (
                                            <>
                                                <span key={i}>{address.name}</span>
                                                {(i !== city.address.component.length - 2) && (<span>, </span>)}
                                            </>
                                        ))
                                    }
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            {
                !loading && query.length > 2 && (results?.length === 0 || !results) && (
                    <p className={stl.search__notFound}>Синоптики таких мест не&nbsp;знают</p>
                )
            }
        </div>
    )
}