import {create} from 'zustand'
import {fetchLocation} from "@/lib/location";

interface HistoryItem {
    city: string
    lat: number
    lon: number
}

interface SearchType {
    open: boolean
    history: HistoryItem[]
    getHistory: () => HistoryItem[] | []
    clearHistory: () => void
    addToHistory: (item: HistoryItem) => void
    setSelect: (
        city: string
    ) => Promise<HistoryItem | undefined>
    init: () => void
}

const SEARCH_HISTORY_KEY = 'search_history'
const MAX_HISTORY = 7

export const useSearchStore = create<SearchType>((set, get) => ({
    open: false,
    history: [],

    getHistory: () => {
        if (typeof window === 'undefined') return []
        const cached = localStorage.getItem(SEARCH_HISTORY_KEY)
        return cached ? JSON.parse(cached) : []
    },
    init: () => set({history: get().getHistory()}),
    clearHistory: () => {
        localStorage.removeItem(SEARCH_HISTORY_KEY)
        set({history: []})
    },
    addToHistory: (item: HistoryItem) => {
        const history = get().history
        const filtered = history.filter(h => h.city !== item.city)
        const updated = [item, ...filtered].slice(0, MAX_HISTORY)
        set({history: updated})
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
    },
    async setSelect(city: string) {
        const [location] = await Promise.all([
            fetchLocation(undefined, undefined, city)
        ])
        if (!location) return
        localStorage.setItem('coords', JSON.stringify({lat: location.lat, lon: location.lon}))
        get().addToHistory({city: location.city, lat: location.lat, lon: location.lon})
        return location
    }
}))