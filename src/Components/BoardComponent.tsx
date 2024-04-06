import React, { FC, useContext, useEffect, useState } from "react";
import { Board } from "../Models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../Models/Cell";
import { FigureNames } from "../Models/Figures/Figure";
import { PlayerContext } from "../ChessContext";
import { Time } from "../Constants/Constants";
import { Colors } from "../Models/Colors";
import { timeout } from "../Extension/ChessExtension";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
    restart: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, swapPlayer, restart }) =>{
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [isCheck, setIsCheck] = useState(false);

    const playerContext = useContext(PlayerContext);

    useEffect(() => {
        playerContext?.currentPlayer?.Check(isCheck);
    }, [isCheck])

    async function click(cell: Cell){
        if(playerContext?.currentPlayer?.checkMate !== false)
            return;

        let king = selectedCell?.getKingByColor();
        let oppositCells = selectedCell?.board.getCellsByColor(selectedCell.figure!.color);
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)
            && selectedCell.board.figureCanMakeThisStep(selectedCell, cell, king, oppositCells!)){
            if(playerContext.currentPlayer.check === true){
                playerContext.currentPlayer.Check(false);
            }
            selectedCell.moveFigure(cell);
            await timeout(100);
            swapPlayer();
            setIsCheck(cell.isCheckForKing());
            setSelectedCell(null);
        }else{
            if(cell.figure?.color === playerContext?.currentPlayer?.color){
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    function highlightCells(){
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    function handleRestart(){
        playerContext?.setBlackTime(Time);
        playerContext?.setWhiteTime(Time);
        restart();
    }

    return (
        <div>
            <div className="board-header">
                <h3 className="board-title">Текущий игрок: {playerContext?.currentPlayer?.color}</h3>
                <div>
                    <button onClick={handleRestart} className="restart-button">Restart game</button>
                </div>
            </div>
            <div className={['board', playerContext?.currentPlayer?.color === Colors.BLACK ? "reverse reverse-board-transition" : "reverse-base reverse-board-transition"].join(' ')}>
                {board.cells.map((row, index) => 
                    <React.Fragment key={index}>
                        {row.map(cell => 
                            <CellComponent key={cell.id} 
                                    click={click}
                                    cell={cell} 
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                    check={(playerContext?.currentPlayer?.check && 
                                            cell.figure?.name === FigureNames.KING &&
                                            playerContext?.currentPlayer?.color === cell.figure.color) ? true : false}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default BoardComponent;