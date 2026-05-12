'use client'
import stl from './bike.module.sass'
import Bike from '@/assets/icons/bike.svg'
import Location from "@/components/ui/location";
import Button from "@/components/ui/button";

interface Props {
    city: string
    refresh: () => void
    value: number
    title: string
    subtitle: string
    description: string
}

export default function MainBike({city, refresh, value, title, subtitle, description}: Props) {

    return (
        <section className={stl.main}>
            <div className={stl.main__header}>
                <Location classCustom={stl.main__city} city={city}/>
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
                    <h1 className={stl.main__temp}>{title}</h1>
                    <p className={stl.main__condition}>{subtitle}</p>
                </div>
            </div>
            <div className={stl.main__rangeBlock}>
                <div className={stl.main__range}>
                    <div className={`${stl.main__marker}`} style={{'--val': value + '%'} as React.CSSProperties}>
                        <div className={stl.main__markerValue}>{value}%</div>
                    </div>
                </div>
                <div className={stl.main__rangeValues}>
                    <p className={stl.main__value}>плохо</p>
                    <p className={stl.main__value}>идеально</p>
                </div>
            </div>
            <p className={stl.main__description}>{description}</p>
        </section>
    )
}