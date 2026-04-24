import stl from './cards.module.sass'

interface PhaseType {
    name: string
    description: string
    value: {
        min: number
        max: number
    }
}

const phases: PhaseType[] = [
    {
        name: 'Новолуние',
        description: 'Луна отдыхает, небо полностью тёмное',
        value: {min: 0, max: 0}
    },
    {
        name: 'Растущая луна',
        description: 'Только появилась, тоненький краешек',
        value: {min: 0.01, max: 0.24}
    },
    {
        name: 'Первая четверть',
        description: 'Половина луны уже на месте',
        value: {min: 0.25, max: 0.25}
    },
    {
        name: 'Прибывающая луна',
        description: 'Растёт и скоро будет полной',
        value: {min: 0.26, max: 0.49}
    },
    {
        name: 'Полнолуние',
        description: 'Луна во всей красе, ночью почти светло',
        value: {min: 0.5, max: 0.5}
    },
    {
        name: 'Убывающая луна',
        description: 'Полнолуние позади, луна идёт на убыль',
        value: {min: 0.51, max: 0.74}
    },
    {
        name: 'Последняя четверть',
        description: 'Осталась половина, скоро снова темно',
        value: {min: 0.75, max: 0.75}
    },
    {
        name: 'Старая луна',
        description: 'Совсем тонкая, вот-вот пропадёт',
        value: {min: 0.76, max: 1}
    },
]

export default function MoonPhase({phase}: { phase: number }) {
    let currentPhase: PhaseType = phases.find(
        item => phase >= item.value.min && phase <= item.value.max
    ) ?? phases[0]

    function getMoonOffset(phase: number): number {
        if (phase <= 0.5) {
            return phase * 2 * (100 * phase * 2)
        } else {
            return (phase * 2 - 2) * (100 * phase * 2)
        }
    }

    const moonOffset = getMoonOffset(phase)

    return (
        <div className={`${stl.moon} ${stl.card}`}>
            <div className={`${stl.moon__icon} ${stl.card__icon}`} style={{'--i': `${moonOffset}%`} as React.CSSProperties}>
            </div>
            <p className={stl.card__title}>{currentPhase.name}</p>
            <p className={stl.card__tag}>{currentPhase.description}</p>
        </div>
    )
}