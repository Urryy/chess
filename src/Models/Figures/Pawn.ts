import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../Assets/white-pawn.png';
import blackLogo from '../../Assets/black-pawn.png';

export class Pawn extends Figure{
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    canMove(target: Cell, isStepKing: boolean = false): boolean {
        if(!super.canMove(target, isStepKing) && !isStepKing){
            return false;
       }
        return this.move(target);
     }
 

    isCheckForKing(target: Cell){
        super.isCheckForKing(target);
        return this.move(target);
    }

    private move(target: Cell): boolean{
        const direction = this.cell.figure?.color === Colors.WHITE ? -1 : 1;
        const firstStepDicrection = this.cell.figure?.color === Colors.WHITE ? -2 : 2;  

        if((target.y === this.cell.y + direction || (this.isFirstStep && (target.y === this.cell.y + firstStepDicrection)))
            && target.x === this.cell.x
            && this.cell.board.getCell(target.x, target.y).isEmpty()){
            return true;
        }

        if(target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)){
            return true;
        }

        return false;
    }    

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}