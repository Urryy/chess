import { Colors } from "./Colors";
import { Figure, FigureNames } from "./Figures/Figure";
import { Board } from "./Board";

export class Cell{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number; //dla react kluczej

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null){
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = Math.random();
    }

    getKingByColor(color: Colors | undefined): Cell | null{
        let king = null 
        for (let i = 0; i < this.board.cells.length; i++) {
            const row = this.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                if(row[j].figure?.name === FigureNames.KING && row[j].figure?.color === color)
                    return row[j];
            }
        }
        return king;
    }

    isEmpty(): Boolean{
        return this.figure === null;
    }

    isEnemy(target: Cell): Boolean{
        return (((this.x + 1 === target.x) || (this.x - 1 === target.x)) && target.figure !== null);
    }

    isThreadForKing(color: Colors): boolean{
        let cellsWithFigures: Cell[] = this.board.getCellsByColor(color);
        
        for (let x = 0; x < cellsWithFigures.length; x++) {
            if(cellsWithFigures[x].figure?.name === FigureNames.PAWN){
                const direction = cellsWithFigures[x].figure?.color === Colors.WHITE ? -1 : 1;
                if(this.y === cellsWithFigures[x].y + direction
                    && (this.x === cellsWithFigures[x].x + 1 || this.x === cellsWithFigures[x].x - 1)){
                    return true;
                }
            }  
            else if(cellsWithFigures[x] !== this && cellsWithFigures[x].figure?.canMove(this, true)){
                return true; 
            }   
        }

        return false;
    }

    checkIfItsCheckForKing(oppositCells: Cell[], target: Cell){
        for (let x = 0; x < oppositCells.length; x++) {
            if(oppositCells[x].figure?.canMove(this, true) && oppositCells[x] !== target)
                return true;
        }
        return false;
    }

    isCheckForKing(): boolean{
/*         var cellWithKing: Cell | null = null;
        for (let y = 0; y < this.board.cells.length; y++) {
            const row: Cell[] = this.board.cells[y];
            for (let x = 0; x < row.length; x++) {
                if(row[x].figure?.name === FigureNames.KING && this.figure?.color !== row[x].figure?.color)
                    cellWithKing = row[x];
            }
        } */
        let king = this.getKingByColor(this.figure?.color === Colors.WHITE ? Colors.BLACK : Colors.BLACK)
        if(this.figure?.isCheckForKing(king!))
            return true;

        return false;
    }

    setFigure(figure: Figure){
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure){
        figure.color === Colors.WHITE 
            ? this.board.lostWhiteFigures.push(figure) 
            : this.board.lostBlackFigures.push(figure);
    }

    isEmptyVertical(target: Cell): boolean{
        if(this.x !== target.x){
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if(!this.board.getCell(this.x, y).isEmpty()){
                return false;
            }
        }

        return true;
    }

    isEmptyHorizontal(target: Cell): boolean{
        if(this.y !== target.y){
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if(!this.board.getCell(x, this.y).isEmpty()){
                return false;
            }
        }

        return true;
    }   

    isEmptyDiagonal(target: Cell): boolean{
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if(absY !== absX){
            return false;
        }

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty())
                return false;
        }
        return true;
    }

    moveFigure(target: Cell){
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target);
            if(target.figure){
                this.addLostFigure(target.figure);
            }

            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}