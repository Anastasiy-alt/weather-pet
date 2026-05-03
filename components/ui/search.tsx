'use client'

import stl from './ui.module.sass'
import {useState} from 'react'
import {useCitySearch} from '@/hooks/useSearch'
import {useWeatherStore} from '@/store/weather'
import {CityResult} from '@/types'
import {usePathname, useRouter} from "next/navigation";

export default function Search() {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const {results, loading} = useCitySearch(query)
    const load = useWeatherStore(s => s.load)

    const router = useRouter()
    const pathname = usePathname()

    function handleSelect(city: CityResult) {
        load(city.lat, city.lon)
        setQuery(city.city)
        setOpen(false)

        // обновляем URL только на главной
        if (pathname === '/') {
            const params = new URLSearchParams()
            params.set('lat', city.lat.toString())
            params.set('lon', city.lon.toString())
            router.replace(`/?${params.toString()}`, { scroll: false })
        }
    }

    console.log(results)

    return (
        <div className={stl.searchWrap}>
            <form className={stl.search} onSubmit={e => e.preventDefault()}>
                <input
                    className={stl.search__input}
                    type="text"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    // onBlur={() => setTimeout(() => setOpen(false), 200)}
                />
                <span
                    className={`${stl.input__span} ${query.length > 0 ? stl.input__span_open : ''}`}>введите город</span>
                {/*{loading && <span className={stl.search__loader}>...</span>}*/}
            </form>

            {open && results.length > 0 && (
                <ul className={stl.search__dropdown}>
                    {results.map((city) => (
                        <li onClick={() => handleSelect(city)}
                              key={city.place_id}
                              className={stl.search__item}>
                            <span className={stl.search__city}>{city.city}</span>
                            <span className={stl.search__country}>{city.address_line2}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}