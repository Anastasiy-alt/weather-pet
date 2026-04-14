import ClearDay from '@/assets/icons/clear-day.svg'
import ClearNight from '@/assets/icons/clear-night.svg'
import Cloudy from '@/assets/icons/cloudy.svg'
import Fog from '@/assets/icons/fog.svg'
import Hail from '@/assets/icons/hail.svg'
import PartlyCloudyDay from '@/assets/icons/partly-cloudy-day.svg'
import PartlyCloudyNight from '@/assets/icons/partly-cloudy-night.svg'
import Rain from '@/assets/icons/rain.svg'
import RainSnow from '@/assets/icons/rain-snow.svg'
import RainSnowShowersDay from '@/assets/icons/rain-snow-showers-day.svg'
import RainSnowShowersNight from '@/assets/icons/rain-snow-showers-night.svg'
import ShowersDay from '@/assets/icons/showers-day.svg'
import ShowersNight from '@/assets/icons/showers-night.svg'
import Snow from '@/assets/icons/snow.svg'
import SnowShowersDay from '@/assets/icons/snow-showers-day.svg'
import SnowShowersNight from '@/assets/icons/snow-showers-night.svg'
import Thunder from '@/assets/icons/thunder.svg'
import ThunderRain from '@/assets/icons/thunder-rain.svg'
import ThunderShowersDay from '@/assets/icons/thunder-showers-day.svg'
import ThunderShowersNight from '@/assets/icons/thunder-showers-night.svg'
import Wind from '@/assets/icons/wind.svg'

const icons = {
    'clear-day': ClearDay,
    'clear-night': ClearNight,
    'cloudy': Cloudy,
    'fog': Fog,
    'hail': Hail,
    'partly-cloudy-day': PartlyCloudyDay,
    'partly-cloudy-night': PartlyCloudyNight,
    'rain': Rain,
    'rain-snow': RainSnow,
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
}

export default function WeatherIcon({name} : {name: string}) {
    const Icon = icons[name as keyof typeof icons]
    if (!Icon) return null
    return <Icon  />
}