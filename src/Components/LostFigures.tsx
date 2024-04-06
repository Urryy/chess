import React, { FC } from "react";
import { Figure } from "../Models/Figures/Figure";

interface LostFiguresProps{
    title: string;
    figures: Figure[];
    className?: string | null;
}

export const LostFigures: FC<LostFiguresProps> = ({title, figures, className}) => {
    return (
        <div className='lost'>
            <div className={className !== null ? className : ''}>
            </div>
            <div>
                <h3 style={{zIndex: 1}}>{title}</h3>
                {figures.map(figure => 
                    <div key={figure.id}>
                        {figure.name}  {figure.logo && <img src={figure.logo} alt="" style={{height: "20p", width:"20px"}}></img>}
                    </div>   
                )}
            </div>
        </div>
    );
}