import stl from './weather.module.sass'
import Button from "@/components/ui/button";
import LocationIcon from "@/assets/icons/location.svg";
import WeatherIcon from "@/components/weather/ui/icon";
import {Alert as AlertType} from "@/types";
import Alert from "@/components/weather/ui/alert";
import Modal from "@/components/ui/modal";
import AlertIcon from '@/assets/icons/alert.svg'
import {useState} from "react";
import Location from "@/components/ui/location";

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
    const [open, setOpen] = useState(false);

    return (

        <article className={stl.widget}>
            <div className={stl.widget__main}>
                <Location classCustom={stl.widget__city} city={city} />
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
                <>
                    <button className={stl.widget__alertBtn} onClick={() => setOpen(true)}>
                        <AlertIcon/>
                        Предупреждения
                    </button>
                    <Modal open={open} close={() => setOpen(false)}>
                        <div className={`${stl.widget__alerts} ${stl.widget__alerts_mobile}`}>
                            {alerts.map(alert => (
                                <Alert key={alert.id} alert={alert}/>
                            ))}
                        </div>
                    </Modal>
                    <div className={`${stl.widget__alerts} ${stl.widget__alerts_desk}`}>
                        {alerts.map(alert => (
                            <Alert key={alert.id} alert={alert}/>
                        ))}
                    </div>
                </>
            }
        </article>

    )
}