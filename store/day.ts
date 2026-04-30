import { create } from 'zustand'

interface DayState {
    activeHourIndex: number | undefined
    setActiveHourIndex: (i: number) => void
    clearActiveHourIndex: () => void
}

export const useDayStore = create<DayState>((set) => ({
    activeHourIndex: undefined,
    setActiveHourIndex: (i) => set({ activeHourIndex: i }),
    clearActiveHourIndex: () => set({ activeHourIndex: undefined }),
}))
