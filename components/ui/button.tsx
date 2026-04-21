import styles from './ui.module.sass'
import Link from 'next/link'
import {MouseEventHandler} from "react";

export default function Button({link, text, variant = 'btn', action, classCustom = ''}: { link?: string, text: string, variant: 'btn' | 'link', action?: MouseEventHandler<HTMLButtonElement>, classCustom: string }) {
    return (
        <>
            {
                variant === 'btn' ?
                    (<button className={`${styles.btn} ${classCustom}`} onClick={action}>
                        {text}
                    </button>)
                    :
                    (<Link href={String(link)} className={`${styles.btn} ${classCustom}`}>
                        {text}
                    </Link>)
            }
        </>
    )
}
