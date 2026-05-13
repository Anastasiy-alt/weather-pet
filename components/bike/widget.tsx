'use client'

import {useMemo} from "react";
import MainBike from "@/components/bike/main";
import CardBike from "@/components/bike/card";
import Loader from "@/components/ui/loader";
import {useWeatherStore} from "@/store/weather";
import {BikeAnalyze, BikeAnalyzeResult, Result} from "@/components/bike/const";
import stl from './bike.module.sass'

export default function BikeWidget() {
    const {weather, location, loading, refresh} = useWeatherStore();

    const analyze: BikeAnalyzeResult | null = useMemo(() => {
        if (!weather?.currentConditions) return null;

        const bikeAnalyze = new BikeAnalyze();

        return bikeAnalyze.init(
            weather.currentConditions,
            weather.currentConditions.sunriseEpoch,
            weather.currentConditions.sunsetEpoch,
            weather.timezone
        );
    }, [weather]);

    if (loading || !weather || !location || !analyze) {
        return <Loader/>;
    }

    return (
        <section className={stl.page}>
            <MainBike
                city={location.city}
                refresh={refresh}
                value={analyze.percent}
                title={analyze.conditions.title}
                subtitle={analyze.conditions.description}
            />

            {analyze.array.map((i: Result) => (
                <CardBike
                    key={i.id}
                    title={i.title}
                    value={
                        (Number.isInteger(i.key)
                            ? i.key.toString()
                            : typeof i.key === 'number'
                                ? i.key.toFixed(1)
                                : i.key) + i.keyProp
                    }
                    customClass={i.weight > 0 ? stl.card_weight : ''}
                    description={i.description}
                />
            ))}
        </section>
    );
}