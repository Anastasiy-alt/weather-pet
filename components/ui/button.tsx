import stl from './ui.module.sass'
import Link from 'next/link'
import {MouseEventHandler} from "react";

export default function Button({link, text, variant = 'btn', action, classCustom = '', secondary}: { link?: string, text: string, variant: 'btn' | 'link', action?: MouseEventHandler<HTMLButtonElement>, classCustom?: string, secondary?: boolean }) {
    return (
        <>
            {
                variant === 'btn' ?
                    (<button className={`${stl.btn} ${secondary ? stl.btn_secondary : ''} ${classCustom}`} onClick={action}>
                        {text}
                    </button>)
                    :
                    (<Link href={String(link)} className={`${stl.btn} ${secondary ? stl.btn_secondary : ''} ${classCustom}`}>
                        {text}
                    </Link>)
            }
        </>
    )
}
