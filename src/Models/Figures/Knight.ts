import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../Assets/white-knight.png';
import blackLogo from '../../Assets/black-knight.png';

export class Knight extends Figure{
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT;
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
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }
}