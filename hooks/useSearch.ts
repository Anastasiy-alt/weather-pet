'use client'

import { useState, useEffect } from 'react'
import { searchCities } from '@/lib/search'
import {CityResult} from "@/types";

export function useCitySearch(query: string) {
    const [results, setResults] = useState<CityResult[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        setLoading(true)
        const timeout = setTimeout(async () => {
            const data = await searchCities(query)
            setResults(data.results)
            setLoading(false)
        }, 400)

        return () => clearTimeout(timeout)
    }, [query])

    return { results, loading }
}