'use client'
import * as React from 'react'
import {useEffect, useState} from 'react'
import * as ReactDOM from 'react-dom'
import {ReactifiedModule} from '@yandex/ymaps3-types/reactify/reactify'
import type {YMapLocationRequest} from '@yandex/ymaps3-types'
import stl from './cards.module.sass'

declare global {
    interface Window {
        ymaps3: any
    }
}
type ReactifiedApi = ReactifiedModule<typeof ymaps3>

interface YMapProps {
    lat: number
    lon: number
    zoom?: number
}

export default function YMap({lat, lon, zoom = 13}: YMapProps) {
    const [reactifiedApi, setReactifiedApi] = useState<ReactifiedApi>()

    const location: YMapLocationRequest = {
        center: [lon, lat],
        zoom,
    }

    useEffect(() => {
        Promise.all([
            window.ymaps3.import('@yandex/ymaps3-reactify'),
            window.ymaps3.ready
        ]).then(([{reactify}]) =>
            setReactifiedApi(reactify.bindTo(React, ReactDOM).module(window.ymaps3))
        )
    }, [])


    if (!reactifiedApi) return null

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = reactifiedApi

    return (
        <div className={stl.map}>
            <YMap location={location}>
                <YMapDefaultSchemeLayer/>
                <YMapDefaultFeaturesLayer/>
                <YMapMarker coordinates={[lon, lat]}>
                    <div className={stl.map__marker}/>
                </YMapMarker>
            </YMap>
        </div>
    )
}