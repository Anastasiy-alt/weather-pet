import stl from "./cards.module.sass";

const VISIBILITY_LEVELS = [
    {max: 0.05, label: 'Густой туман', description: 'Руку протяни — и не видно', fog: 0.95},
    {max: 0.5, label: 'Сильный туман', description: 'Пешком ещё куда ни шло, но за руль — нет', fog: 0.85},
    {max: 2, label: 'Туман', description: 'Видно пару километров, езди осторожно', fog: 0.7},
    {max: 4, label: 'Дымка', description: 'Вроде видно, но как сквозь молоко', fog: 0.5},
    {max: 7, label: 'Хорошая', description: 'Горизонт есть, жить можно', fog: 0.2},
    {max: 10, label: 'Отличная', description: 'Всё чётко, небо открытое', fog: 0},
    {max: Infinity, label: 'Идеальная', description: 'Видно до горизонта и дальше', fog: 0},
]

export default function Visible({vis}: { vis: number }) {

    function getVisibilityLevel(km: number) {
        return VISIBILITY_LEVELS.find(l => km <= l.max) ?? VISIBILITY_LEVELS[VISIBILITY_LEVELS.length - 1]
    }

    const level = getVisibilityLevel(vis)
    return (
        <div className={`${stl.visible} ${stl.card}`}>
            <div className={`${stl.visible__block} ${stl.card__icon}`} style={{'--fog': level.fog} as React.CSSProperties}>
                <div className={stl.visible__item}></div>
                <div className={stl.visible__item}></div>
                <div className={stl.visible__item}></div>
            </div>
            <p className={`${stl.visible__title} ${stl.card__title}`}>Видимость {vis}км</p>
            <p className={stl.card__subtitle}> {level.label}</p>
            <p className={stl.card__tag}>{level.description}</p>
        </div>
    )
}