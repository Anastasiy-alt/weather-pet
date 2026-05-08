import stl from './search.module.sass'
export default function SearchLoader() {
    return(
        <div className={stl.loader}>
            <span className={stl.loader__dot}></span>
            <span className={stl.loader__dot}></span>
            <span className={stl.loader__dot}></span>
            <span className={stl.loader__dot}></span>
        </div>
    )
}