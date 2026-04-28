import stl from './header.module.sass'
import WeatherIcon from "@/components/weather/ui/icon";
import Link from "next/link";

const icons = [
    'clear-day',
    'clear-night',
    'cloudy',
    'fog',
    'hail',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'rain',
    'rain-snow',
    'rain-snow-showers-day',
    'rain-snow-showers-night',
    'showers-day',
    'showers-night',
    'snow',
    'snow-showers-day',
    'snow-showers-night',
    'thunder',
    'thunder-rain',
    'thunder-showers-day',
    'thunder-showers-night',
]

function getRandomIcon() {
    return icons[Math.floor(Math.random() * icons.length)]
}

export default function HeaderApp() {
    const randomIcon = getRandomIcon()

    return (
        <header className={stl.header}>
            <Link className={stl.header__icon} href="/">
                <WeatherIcon name={randomIcon}/>
            </Link>
            <nav className={stl.header__nav}>
                <Link className={stl.header__link} href="/about">О проекте</Link>
                <Link className={stl.header__link} href="/where-i-am">Где я?</Link>
                <Link className={stl.header__link} href="/day">Погода на 15 дней</Link>
            </nav>
        </header>
    )
}