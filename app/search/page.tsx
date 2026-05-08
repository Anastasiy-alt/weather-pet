import stl from './search.module.sass'
import Search from "@/components/ui/search/search";
import SearchHistory from "@/components/ui/search/history";

export default function SearchPage() {

    return (
        <section className={stl.search}>
            <h1 className={stl.search__title}>Поиск погоды по городам</h1>
            <SearchHistory/>
            <Search/>
        </section>
    )
}