import { Colors } from "../Colors";
import logo from '../../Assets/black-king.png';
import { Cell } from "../Cell";

export enum FigureNames{
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон"
}

export class Figure{
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell){
        this.color = color;
        this.cell = cell;
        this.id = Math.random();
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
    }

    canMove(target: Cell, isStepKing: boolean = false) : boolean{
        if(target.figure?.color === this.color){
            return false;
        }

        if(target.figure?.name === FigureNames.KING){
            return false;
        }

        return true;
    }

    isCheckForKing(target: Cell) { }

    moveFigure(target: Cell){ }
}