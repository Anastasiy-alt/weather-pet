import styles from './ui.module.sass'
import Link from 'next/link'
import {MouseEventHandler} from "react";

export default function Button({link, text, variant = 'btn', action}: { link?: string, text: string, variant: 'btn' | 'link', action?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <>
            {
                variant === 'btn' ?
                    (<button className={styles.btn} onClick={action}>
                        {text}
                    </button>)
                    :
                    (<Link href={String(link)} className={styles.btn}>
                        {text}
                    </Link>)
            }
        </>
    )
}
