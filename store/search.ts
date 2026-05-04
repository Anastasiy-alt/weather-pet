import { create } from 'zustand'

interface SearchType {
    open: boolean
    toggle: () => void
    setOpen: () => void
    setClose: () => void
}

export const useSearchStore = create<SearchType>((set, get) => ({
    open: false,

    toggle: () => {
        set(state => ({open: !state.open}))
    },

    setOpen: () => {
        set({open: true})
    },

    setClose: () => {
        set({open: false})
    }
}))