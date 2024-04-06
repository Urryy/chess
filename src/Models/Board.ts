import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./Figures/Bishop";
import { Figure, FigureNames } from "./Figures/Figure";
import { King } from "./Figures/King";
import { Knight } from "./Figures/Knight";
import { Pawn } from "./Figures/Pawn";
import { Queen } from "./Figures/Queen";
import { Rook } from "./Figures/Rook";

export class Board{
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];
    
    initCells(){
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < 8; x++) {
                if((x + y) % 2 !== 0){
                    row.push(new Cell(this, x, y, Colors.BLACK, null));
                }else{
                    row.push(new Cell(this, x, y, Colors.WHITE, null));
                }
            }
            this.cells.push(row);
        }
    }

    public getCell(x: number, y: number): Cell{
        return this.cells[y][x];
    }

    public getCellsByColor(color: Colors): Cell[]{
        let cellsWithFigures: Cell[] = [];
        for (let y = 0; y < this.cells.length; y++) {
            const row = this.cells[y];
            for (let x = 0; x < row.length; x++) {
                if(row[x].figure && row[x].figure?.name !== FigureNames.KING && color !== row[x].figure?.color){
                    cellsWithFigures.push(row[x]);
                }   
            }
        }
        return cellsWithFigures;
    }

    public highlightCells(selectedCell: Cell | null){
        let ownKing = selectedCell?.getKingByColor();
        let oppositeCells = selectedCell !== null && selectedCell.figure !== null ? this.getCellsByColor(selectedCell!.figure.color) : [];
        for (let y = 0; y < this.cells.length; y++) {
            const row: Cell[] = this.cells[y];
            for (let x = 0; x < row.length; x++) {
                const target = row[x];
                let canMove = !!selectedCell?.figure?.canMove(target);
                if(canMove === false){
                    target.available = false;
                }else{
                    target.available = this.figureCanMakeThisStep(selectedCell, target, ownKing, oppositeCells);
                }
            }
        }
    }

    public figureCanMakeThisStep(selectedCell: Cell | null, target: Cell, ownKing: Cell | null | undefined, oppositeCells: Cell[]){
        if(selectedCell?.figure?.name === FigureNames.KING){
            return true;
        }else{
            let previousPlaceFigure = selectedCell?.figure;
            let figureFromTarget = target.figure;

            this.cells[selectedCell!.y][selectedCell!.x].figure = null;
            this.cells[target.y][target.x].figure = previousPlaceFigure!;  
            let canMakeThisStep = !ownKing?.checkIfItsCheckForKing(oppositeCells, this.cells[target.y][target.x]);
            this.cells[selectedCell!.y][selectedCell!.x].figure = previousPlaceFigure!;
            this.cells[target.y][target.x].figure = figureFromTarget;
            return canMakeThisStep;
        }
    }

    public getCopyBoard(): Board{
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;
    }

    public addFigure(){
        this.AddBishops();
        this.AddKings();
        this.AddKnights();
        this.AddPawns();
        this.AddQueens();
        this.AddRooks();
    }

    private AddBishops(){
/*         new Bishop(Colors.WHITE, this.getCell(2 , 0));
        new Bishop(Colors.WHITE, this.getCell(5 , 0));
        new Bishop(Colors.BLACK, this.getCell(2 , 7));
        new Bishop(Colors.BLACK, this.getCell(5 , 7)); */

        new Bishop(Colors.BLACK, this.getCell(2 , 0));
        new Bishop(Colors.BLACK, this.getCell(5 , 0));
        new Bishop(Colors.WHITE, this.getCell(2 , 7));
        new Bishop(Colors.WHITE, this.getCell(5 , 7));
    }

    private AddKings(){
        /* new King(Colors.WHITE, this.getCell(4 , 0));
        new King(Colors.BLACK, this.getCell(4 , 7)); */
        new King(Colors.BLACK, this.getCell(4 , 0));
        new King(Colors.WHITE, this.getCell(4 , 7));
    }

    private AddKnights(){
/*         new Knight(Colors.WHITE, this.getCell(1 , 0));
        new Knight(Colors.WHITE, this.getCell(6 , 0));
        new Knight(Colors.BLACK, this.getCell(1 , 7));
        new Knight(Colors.BLACK, this.getCell(6 , 7)); */

        new Knight(Colors.BLACK, this.getCell(1 , 0));
        new Knight(Colors.BLACK, this.getCell(6 , 0));
        new Knight(Colors.WHITE, this.getCell(1 , 7));
        new Knight(Colors.WHITE, this.getCell(6 , 7));
    }

    private AddPawns(){
        for (let x = 0; x < 8; x++) {
/*             new Pawn(Colors.WHITE, this.getCell(x , 1));
            new Pawn(Colors.BLACK, this.getCell(x , 6)); */
            new Pawn(Colors.BLACK, this.getCell(x , 1));
            new Pawn(Colors.WHITE, this.getCell(x , 6));
        }
    }

    private AddQueens(){
/*         new Queen(Colors.WHITE, this.getCell(3 , 0));
        new Queen(Colors.BLACK, this.getCell(3 , 7)); */
        new Queen(Colors.BLACK, this.getCell(3 , 0));
        new Queen(Colors.WHITE, this.getCell(3 , 7));
    }

    private AddRooks(){
        new Rook(Colors.BLACK, this.getCell(0 , 0));
        new Rook(Colors.BLACK, this.getCell(7 , 0));
        new Rook(Colors.WHITE, this.getCell(0 , 7));
        new Rook(Colors.WHITE, this.getCell(7 , 7));
    }
}