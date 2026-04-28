import stl from './ui.module.sass'
import LocationIcon from "@/assets/icons/location.svg";

export default function Location({city, classCustom = ''}: {city: string; classCustom?: string}) {
    return (
        <p className={`${stl.location} ${classCustom}`}>
            <LocationIcon/>
            {city}
        </p>
    )
}