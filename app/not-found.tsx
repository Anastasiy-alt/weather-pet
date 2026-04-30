import Link from 'next/link'
import stl from './globals.module.sass'
import ThunderCloud from '@/assets/icons/thunder_cloud.svg'
import ThunderLight from '@/assets/icons/thunder_light.svg'

export default function NotFound() {

    return (
        <div className={stl.notFound}>
            <div className={stl.notFound__block}>
                <ThunderCloud className={`${stl.notFound__icon} ${stl.notFound__icon_cloud}`} />
                <ThunderLight className={`${stl.notFound__icon} ${stl.notFound__icon_light}`} />
            </div>
            <h1 className={stl.notFound__title}>404</h1>
            <p className={stl.notFound__sub}>Синоптики обещали эту страницу,<br/>но как обычно ошиблись</p>
            <Link href="/" className={stl.notFound__link}>
                На главную, там хотя бы не гремит
            </Link>
        </div>
    )
}