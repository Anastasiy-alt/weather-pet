'use client'
import {usePathname, useRouter} from 'next/navigation'
import {useWeatherStore} from '@/store/weather'
import {useGeoStore} from '@/store/geolocation'
import {useSearchStore} from '@/store/search'

export function useSelectCity() {
    const {setSelect} = useSearchStore()
    const load = useWeatherStore(s => s.load)
    const {setLocation} = useGeoStore()
    const router = useRouter()
    const pathname = usePathname()

    return async (city: string) => {
        const loc = await setSelect(city)
        if (!loc) return
        if (pathname === '/') {
            const params = new URLSearchParams()
            params.set('lat', loc.lat.toString())
            params.set('lon', loc.lon.toString())
            router.replace(`/?${params.toString()}`, {scroll: false})
        }
        await load(loc.lat, loc.lon)
        setLocation({lat: loc.lat, lon: loc.lon})
    }
}
