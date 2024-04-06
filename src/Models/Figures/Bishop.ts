import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

import whiteLogo from '../../Assets/white-bishop.png';
import blackLogo from '../../Assets/black-bishop.png';

export class Bishop extends Figure{
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell, isStepKing: boolean = false): boolean {
        if(!super.canMove(target) && !isStepKing){
             return false;
        }

        return this.move(target);
     }
 

    isCheckForKing(target: Cell){
        super.isCheckForKing(target);
        return this.move(target);
    }

    private move(target: Cell): boolean{
        if(this.cell.isEmptyDiagonal(target))
            return true;

        return false;
    }
}