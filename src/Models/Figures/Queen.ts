import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../Assets/white-queen.png';
import blackLogo from '../../Assets/black-queen.png';
import { isSetAccessor } from "typescript";

export class Queen extends Figure{
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
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
       if(this.cell.isEmptyVertical(target)){
        return true;    
       }

       if(this.cell.isEmptyHorizontal(target)){
        return true;    
       }

       if(this.cell.isEmptyDiagonal(target)){
        return true;
       }

       return false;
    }
}