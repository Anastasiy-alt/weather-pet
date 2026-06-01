'use client'
import stl from './search.module.sass'
import {useSearchStore} from "@/store/search";
import {useSelectCity} from "@/hooks/useSelectCity";
import Link from "next/link";
import {useEffect} from "react";

export default function SearchHistory() {
    const {history, clearHistory, init} = useSearchStore()
    const selectCity = useSelectCity()

    useEffect(() => {
        init()
    }, [])

    return (
        <>
            {
                (history && history.length) > 0 &&
                <div className={stl.history}>
                    <p className={stl.history__title}>Искали ранее: </p>
                    <ul className={stl.history__list}>
                        {
                            history.map((i) => (
                                <li key={i.city} onClick={() => selectCity(i.city)}>
                                    <Link href={'/'} className={stl.history__item}>
                                        {i.city}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <button className={stl.history__clear} onClick={clearHistory}>очистить</button>
                </div>

            }
        </>
    )
}