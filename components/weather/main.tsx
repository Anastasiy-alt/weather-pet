import stl from './weather.module.sass'
import Button from "@/components/ui/button";
import LocationIcon from "@/assets/icons/location.svg";
import WeatherIcon from "@/components/weather/ui/icon";
import {Alert as AlertType} from "@/types";
import Alert from "@/components/weather/ui/alert";

interface MainProps {
    city: string
    temp: number
    icon: string
    conditions: string
    feelslike: number
    datetime: string
    alerts: AlertType[]
    update: () => void
}

export default function Main({city, temp, icon, conditions, feelslike, datetime, alerts, update}: MainProps) {
    return (
        <article className={stl.widget}>
            <div className={stl.widget__main}>
                <p className={stl.widget__city}>
                    <LocationIcon/>
                    {city}
                </p>

                <Button classCustom={stl.widget__update}
                        text='Обновить'
                        variant='btn'
                        action={update}/>


                <p className={stl.widget__temp}>{temp > 0 && '+'}{temp}°
                    <WeatherIcon classCustom={`${stl.widget__icon} ${stl.widget__icon_mob}`} name={icon}/>
                </p>


                <WeatherIcon classCustom={`${stl.widget__icon} ${stl.widget__icon_desk}`} name={icon}/>

                <p className={stl.widget__condition}>{conditions}, ощущается
                    как {feelslike > 0 && '+'}{feelslike}°</p>

                <p className={stl.widget__actual}>Данные актуальны
                    на {datetime.split(':')[0]}:{datetime.split(':')[1]}</p>

            </div>
            {alerts.length > 0 &&
                <div className={stl.widget__alerts}>
                    {alerts.map(alert => (
                        <Alert key={alert.id} alert={alert}/>
                    ))}
                </div>}
        </article>
    )
}