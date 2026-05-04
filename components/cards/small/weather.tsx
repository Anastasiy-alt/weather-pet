import stl from './cards.module.sass'
import WeatherIcon from "@/components/weather/ui/icon";

const iconQuotes: Record<string, string> = {
    'clear-day': 'Солнце сегодня расстаралось на полную',
    'clear-night': 'Тёмное небо, звёзды в полном составе, всё как надо',
    'cloudy': 'Серое небо затянуло всё вокруг, но хотя бы сухо',
    'fog': 'Туман густой — соседний дом исчез в неизвестности',
    'hail': 'Небо сегодня агрессивное — кидается льдом',
    'partly-cloudy-day': 'Солнце есть, облака тоже есть, компромисс достигнут',
    'partly-cloudy-night': 'Луна иногда выглядывает, иногда прячется',
    'rain': 'Мокро, серо, уныло — классика жанра',
    'rain-snow': 'Ни дождь ни снег — погода в состоянии выбора',
    'rain-snow-showers-day': 'Днём какая-то каша из всего сразу',
    'rain-snow-showers-night': 'Ночью природа экспериментирует с осадками',
    'showers-day': 'Дождь появляется и пропадает — играет в прятки',
    'showers-night': 'Ночью тихонько капает, почти незаметно',
    'snow': 'Снегопад — красиво ровно до первой прогулки',
    'snow-showers-day': 'Снег налетает внезапно и также внезапно исчезает',
    'snow-showers-night': 'Ночью снег ведёт себя непоследовательно',
    'thunder': 'Гроза без дождя — небо просто выражает эмоции',
    'thunder-rain': 'Гроза с ливнем — природа сегодня на максималках',
    'thunder-showers-day': 'Днём гроза устраивает шоу',
    'thunder-showers-night': 'Ночная гроза гремит на весь район',
    'wind': 'Ветрище — всё что не прибито будет унесено',
    'ice': 'Гололёд — сегодня все немного фигуристы',
}
export default function WeatherSmall({conditions, icon, small}: { conditions: string, icon: string, small?: boolean }) {
    return (
        <div className={`${stl.weather} ${stl.card} ${small ? stl.card_small : ''}`}>
            <WeatherIcon classCustom={stl.card__icon} name={icon}/>

            <p className={`${stl.weather__title} ${stl.card__title}`}>
                {conditions}
            </p>
            <p className={stl.card__tag}>{iconQuotes[icon]}</p>
        </div>
    )
}