import stl from './bike.module.sass'

interface Props {
    title: string
    value: string
    description: string
    customClass?: string
}

export default function CardBike({title, value, description, customClass}: Props) {
    return (
        <div className={`${stl.card} ${customClass}`}>
            <p className={stl.card__title}>{title}</p>
            <div className={stl.card__block}>
                <p className={stl.card__value}>{value}</p>
                <p className={stl.card__description}>{description}</p>
            </div>

            {/*{*/}
            {/*    tip && (*/}
            {/*        <i className={stl.card__tip}>{tip}</i>*/}
            {/*    )*/}
            {/*}*/}
        </div>
    )
}