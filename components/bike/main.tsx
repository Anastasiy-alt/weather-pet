'use client'
import stl from './bike.module.sass'
import Bike from '@/assets/icons/bike.svg'
import Location from "@/components/ui/location";
import Button from "@/components/ui/button";
import {useWeatherStore} from "@/store/weather";
import Loader from "@/components/ui/loader";

export default function MainBike() {
    const {weather, location, loading, refresh} = useWeatherStore()
    if (loading || !weather || !location) return <Loader/>
    const value = 80

    return (
        <section className={stl.main}>
            <div className={stl.main__header}>
                <Location classCustom={stl.main__city} city={location.city}/>
                <Button classCustom={stl.main__update}
                        text='Обновить'
                        variant='btn'
                        action={refresh}/>
            </div>
            <div className={stl.main__block}>
                <div className={stl.main__iconBlock}>
                    <Bike className={stl.main__icon}/>
                </div>
                <div className={stl.main__content}>
                    <p className={stl.main__temp}>Идеально
                    </p>
                    <p className={stl.main__condition}>
                        Отличные условия — самое время крутить педали
                    </p>
                </div>
            </div>
            <div className={stl.main__rangeBlock}>
                <div className={stl.main__range}>
                    <div className={`${stl.main__marker}`} style={{'--val': value + '%'} as React.CSSProperties}></div>
                </div>
                <div className={stl.main__rangeValues}>
                    <p className={stl.main__value}>плохо</p>
                    <p className={stl.main__value}>идеально</p>
                </div>
            </div>
            <p className={stl.main__description}>
                Отличные условия — самое время крутить педали. Отличные условия — самое время крутить педали. Отличные
                условия — самое время крутить педали. Отличные условия — самое время крутить педали.
            </p>
        </section>
    )
}