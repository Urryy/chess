import { Colors } from "./Colors";

export class Player{
    color: Colors;
    check: boolean;
    checkMate: boolean;

    constructor(color: Colors){
        this.check = false;
        this.checkMate = false;
        this.color = color;
    }

    Check(value: boolean){
        this.check = value;
    }

    CheckMate(value: boolean){
        this.checkMate = value;
    }
}