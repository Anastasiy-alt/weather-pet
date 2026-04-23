import {Alert} from "@/types";
import stl from './ui.module.sass'
import {useRef} from "react";
import AlertIcon from '@/assets/icons/alert.svg'

export default function ({alert}: {
    alert: Alert
}) {
    const alertEl = useRef<HTMLDivElement>(null)
    const endDate = new Date(alert.ends);
    const startDate = new Date(alert.onset);
    const formattedEnd = endDate.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedEndTime = endDate.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedStart = startDate.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedStartTime = startDate.toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const openAlert = () => {
        alertEl.current?.classList.toggle(stl.alert_open)
    }

    return (
        <div ref={alertEl} className={stl.alert} onClick={openAlert}>
            <p className={stl.alert__title}>
                <AlertIcon/>
                {alert.headline}
            </p>
            <div className={stl.alert__description}>
                <p>{alert.description}</p>
                <p className={stl.alert__period}>
                    Действует в период с {formattedStart} {formattedStartTime} по {formattedEnd} {formattedEndTime}
                </p>
            </div>
        </div>
    )
}