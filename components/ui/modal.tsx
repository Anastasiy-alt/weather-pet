'use client'
import stl from './ui.module.sass'
import {createPortal} from "react-dom";
import {useEffect, useState} from "react";

export default function Modal({
                                  children, title, open, close
                              }: Readonly<{
    children: React.ReactNode;
    title?: string;
    open: boolean;
    close: () => void;
}>) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    return createPortal(
        <div className={`${stl.modal} ${open ? stl.modal_open : ''}`}>
            <div className={stl.modal__inner}>
                <div className={stl.modal__header}>
                    <p>{title}</p>
                    <button onClick={close} className={stl.modal__close}>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={stl.modal__content}>
                    {children}
                </div>

            </div>
        </div>, document.body
    )
}