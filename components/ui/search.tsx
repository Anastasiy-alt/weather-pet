'use client'

import stl from './ui.module.sass'
import {useState} from 'react'
import {useCitySearch} from '@/hooks/useSearch'
import {useWeatherStore} from '@/store/weather'
import {CityResult} from '@/types'
import {usePathname, useRouter} from "next/navigation";
import {useSearchStore} from "@/store/search";
import {useBackHomeStore} from "@/store/backHome";
import {useGeoStore} from "@/store/geolocation";

const SEARCH_HISTORY_KEY = 'search_history'
const MAX_HISTORY = 5

interface HistoryItem {
    city: string
    lat: number
    lon: number
}

export default function Search() {
    const [query, setQuery] = useState('')
    const [history, setHistory] = useState(() => getHistory())
    const [open, setOpen] = useState(false)
    const {results, loading} = useCitySearch(query)
    const load = useWeatherStore(s => s.load)
    const {setClose} = useSearchStore()
    const router = useRouter()
    const pathname = usePathname()
    const {setLocation} = useGeoStore()
    const {setVisible} = useBackHomeStore()

    function getHistory(): HistoryItem[] {
        if (typeof window === 'undefined') return []
        const cached = localStorage.getItem(SEARCH_HISTORY_KEY)
        return cached ? JSON.parse(cached) : []
    }
    function clearHistory() {
        localStorage.removeItem(SEARCH_HISTORY_KEY)
        setHistory([])
    }
    function addToHistory(item: HistoryItem) {
        const history = getHistory()
        const filtered = history.filter(h => h.city !== item.city)
        const updated = [item, ...filtered].slice(0, MAX_HISTORY)
        setHistory(updated)
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
    }

    function handleSelect(city: CityResult | HistoryItem) {
        localStorage.setItem('coords', JSON.stringify({lat: city.lat, lon: city.lon}))
        addToHistory({city: city.city, lat: city.lat, lon: city.lon})
        load(city.lat, city.lon).then()
        setVisible(true)
        setLocation({lat: city.lat, lon: city.lon})
        setQuery('')
        setOpen(false)
        setClose()
        if (pathname === '/') {
            const params = new URLSearchParams()
            params.set('lat', city.lat.toString())
            params.set('lon', city.lon.toString())
            router.replace(`/?${params.toString()}`, {scroll: false})
        }
    }

    return (
        <div className={stl.searchWrap}>
            {
                (history && history.length) >0 &&
                <div className={stl.history}>
                    <p className={stl.history__title}>Искали ранее: </p>
                    <ul className={stl.history__list}>
                        {
                            history.map((i) => (
                                <li className={stl.history__item} key={i.city} onClick={() => handleSelect(i)}>
                                    {i.city}
                                </li>
                            ))
                        }
                    </ul>
                    <button className={stl.history__clear} onClick={clearHistory}>Очистить историю поиска</button>
                </div>

            }
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