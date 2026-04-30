import stl from './day.module.sass'
import Fog from '@/assets/icons/weather/fog.svg'
import Link from "next/link";

export default function DayNotFound() {
    return (
        <div className={stl.notFound}>
            <div className={stl.notFound__block}>
                <div className={stl.notFound__pseudo}></div>
                <div className={stl.notFound__pseudo}></div>
                <div className={stl.notFound__pseudo}></div>
                <div className={stl.notFound__fog}></div>
                <Fog className={stl.notFound__icon} />

            </div>
            <p className={stl.notFound__title}>Этот день в тумане</p>
            <p className={stl.notFound__sub}>И не только метафорически — данных правда нет</p>
            <Link href="/" className={stl.notFound__link}>
                Выйти из тумана
            </Link>
        </div>
    )
}