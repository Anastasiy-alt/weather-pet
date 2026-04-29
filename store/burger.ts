import { create } from 'zustand'

interface BurgerType {
    open: boolean
    toggle: () => void
    setOpen: () => void
    setClose: () => void
}

export const useBurgerStore = create<BurgerType>((set, get) => ({
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