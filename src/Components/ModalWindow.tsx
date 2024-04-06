import React, { FC, ReactNode } from "react";

interface FinishModalProps{
    isOpen: boolean;
    title: string;
    titleButton?: string | null;
    setIsOpen: (value: boolean) => void;
    children: null | ReactNode;
}

export const FinishModal: FC<FinishModalProps> = ({isOpen, title, titleButton, setIsOpen, children}) => {
    return (
        <React.Fragment>
            {isOpen &&
            <div className="modal">
                <div className="overlay" onClick={() => setIsOpen(false)}>
                </div>
                <div className="modal-content">
                    <div className="header-modal">
                        <h3 className="header-modal__title">{title}</h3>
                        <h3 className="header-modal__close" onClick={() => setIsOpen(false)}>X</h3>
                    </div>
                    <div className='modal-border'></div>
                    <div className="body-modal">
                        {children}
                    </div>
                </div>
            </div>  
            }
        </React.Fragment>
    )
}