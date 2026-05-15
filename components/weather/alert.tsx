import {Alert as AlertType} from '@/types'
import stl from './weather.module.sass'
import AlertIcon from '@/assets/icons/alert.svg'
import Accordion from '@/components/ui/accordion'

export default function Alert({alert}: { alert: AlertType }) {
    const endDate = new Date(alert.ends)
    const startDate = new Date(alert.onset)
    const formattedEnd = endDate.toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})
    const formattedEndTime = endDate.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit'})
    const formattedStart = startDate.toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'})
    const formattedStartTime = startDate.toLocaleString('ru-RU', {hour: '2-digit', minute: '2-digit'})

    return (
        <Accordion title={alert.headline} icon={<AlertIcon/>} color="var(--orange)">
            <div className={stl.alert__description}>
                <p>{alert.description}</p>
                <p className={stl.alert__period}>
                    Действует в период с {formattedStart} {formattedStartTime} по {formattedEnd} {formattedEndTime}
                </p>
            </div>
        </Accordion>
    )
}
