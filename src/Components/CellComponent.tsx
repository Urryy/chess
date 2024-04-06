import React, { FC, useContext } from "react";
import { Cell } from "../Models/Cell";
import { PlayerContext } from "../ChessContext";
import { Colors } from "../Models/Colors";

interface CellProps{
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
    check: boolean
}

const CellComponent: FC<CellProps> = ({cell, selected, click, check}) =>{
    const playerContext = useContext(PlayerContext);
    return (
        <div 
        className={['cell', cell.color, selected ? 'selected' : '', check ? 'check-king' : '', playerContext?.currentPlayer?.color === Colors.BLACK ? "reverse" : "reverse-base"].join(' ')}
        onClick={() => click(cell)}
        style={{background: cell.available && cell.figure ? '#2b5e19db' : ''}}>
            {cell.available && !cell.figure && <div className={"available"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""></img>}
        </div>
    );
}

export default CellComponent;