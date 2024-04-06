import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

import whiteLogo from '../../Assets/white-king.png';
import blackLogo from '../../Assets/black-king.png';

export class King extends Figure{
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target))
            return false;

        const direction = 1;
        if(target.x === this.cell.x && target.y === this.cell.y)
            return false;

        if((target.x === this.cell.x || target.x === this.cell.x + direction || target.x === this.cell.x - 1) 
            && (target.y === this.cell.y || target.y === this.cell.y + direction || target.y === this.cell.y - 1)
            && !this.cell.board.getCell(target.x, target.y).isThreadForKing(this.color))
            return true;

        return false;
    }
}