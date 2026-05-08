import {create} from 'zustand'
import {CityResult} from "@/types";

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
    setSelect: (city: CityResult | HistoryItem) => void
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
    init: () => set({ history: get().getHistory() }),
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
    setSelect(city: CityResult | HistoryItem) {
        localStorage.setItem('coords', JSON.stringify({lat: city.lat, lon: city.lon}))
        get().addToHistory({city: city.city, lat: city.lat, lon: city.lon})
    }
}))