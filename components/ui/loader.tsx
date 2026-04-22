import Sun from '@/assets/icons/weather/clear-day.svg'
import Snow from '@/assets/icons/weather/snow.svg'
import stl from './ui.module.sass'

export default function Loader() {
    const season = new Date().getMonth()
    return(
        <div className={stl.loader}>
            {
                (season < 1 || season === 11) ?
                    <Snow className={stl.loader__icon} /> :
                    <Sun className={stl.loader__icon} />
            }
        </div>
    )
}