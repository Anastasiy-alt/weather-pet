import stl from './ui.module.sass'

export default function Modal({
                                  children, title, open, close
                              }: Readonly<{
    children: React.ReactNode;
    title?: string;
    open: boolean;
    close: () => void;
}>) {
    return (
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
        </div>
    )
}