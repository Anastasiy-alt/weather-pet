import stl from './ui.module.sass'
import ClearDay from '@/assets/icons/weather/clear-day.svg'
import ClearNight from '@/assets/icons/weather/clear-night.svg'
import Cloudy from '@/assets/icons/weather/cloudy.svg'
import Fog from '@/assets/icons/weather/fog.svg'
import Hail from '@/assets/icons/weather/hail.svg'
import PartlyCloudyDay from '@/assets/icons/weather/partly-cloudy-day.svg'
import PartlyCloudyNight from '@/assets/icons/weather/partly-cloudy-night.svg'
import Rain from '@/assets/icons/weather/rain.svg'
import Freezingrain from '@/assets/icons/weather/freezingrain.svg'
import RainSnowShowersDay from '@/assets/icons/weather/rain-snow-showers-day.svg'
import RainSnowShowersNight from '@/assets/icons/weather/rain-snow-showers-night.svg'
import ShowersDay from '@/assets/icons/weather/showers-day.svg'
import ShowersNight from '@/assets/icons/weather/showers-night.svg'
import Snow from '@/assets/icons/weather/snow.svg'
import SnowShowersDay from '@/assets/icons/weather/snow-showers-day.svg'
import SnowShowersNight from '@/assets/icons/weather/snow-showers-night.svg'
import Thunder from '@/assets/icons/weather/thunder.svg'
import Ice from '@/assets/icons/weather/ice.svg'
import ThunderRain from '@/assets/icons/weather/thunder-rain.svg'
import ThunderShowersDay from '@/assets/icons/weather/thunder-showers-day.svg'
import ThunderShowersNight from '@/assets/icons/weather/thunder-showers-night.svg'
import Wind from '@/assets/icons/weather/wind.svg'

const icons = {
    'clear-day': ClearDay,
    'clear-night': ClearNight,
    'cloudy': Cloudy,
    'fog': Fog,
    'hail': Hail,
    'partly-cloudy-day': PartlyCloudyDay,
    'partly-cloudy-night': PartlyCloudyNight,
    'rain': Rain,
    'rain-snow': Freezingrain,
    'rain-snow-showers-day': RainSnowShowersDay,
    'rain-snow-showers-night': RainSnowShowersNight,
    'showers-day': ShowersDay,
    'showers-night': ShowersNight,
    'snow': Snow,
    'snow-showers-day': SnowShowersDay,
    'snow-showers-night': SnowShowersNight,
    'thunder': Thunder,
    'thunder-rain': ThunderRain,
    'thunder-showers-day': ThunderShowersDay,
    'thunder-showers-night': ThunderShowersNight,
    'wind': Wind,
    'ice': Ice
}

export default function WeatherIcon({name, classCustom = ''} : {name: string, classCustom?: string}) {
    const Icon = icons[name as keyof typeof icons]
    if (!Icon) {
        console.log(name, 'No icon')
        return null
    }
    return <Icon className={`${stl.icon} ${classCustom}`}  />
}