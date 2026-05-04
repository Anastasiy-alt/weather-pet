import {create} from 'zustand'

interface BackHomeType {
    visible: boolean
    toggle: () => void
    setVisible: (s: boolean) => void
}

export const useBackHomeStore = create<BackHomeType>((set, get) => ({
    visible: false,

    toggle: () => {
        set(state => ({visible: !state.visible}))
    },

    setVisible: (s: boolean) => {
        set({visible: s})
    },

}))