import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

import whiteLogo from '../../Assets/white-rook.png';
import blackLogo from '../../Assets/black-rook.png';

export class Rook extends Figure{
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
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
        if(this.cell.isEmptyHorizontal(target))
            return true;

        if(this.cell.isEmptyVertical(target))
            return true;

        return false;
    }   
}