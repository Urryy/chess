import React, { FC, useContext, useEffect, useRef } from "react";
import { Colors } from "../Models/Colors";
import { PlayerContext } from "../ChessContext";

interface TimerProps{
    finish: () => void;
}


export const Timer:FC<TimerProps> = ({finish}) => {
    const playerContext = useContext(PlayerContext);
    
    useEffect(() => {
        startTimer()
    }, [playerContext?.currentPlayer])

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    function startTimer(){
        if(timer.current)
            clearInterval(timer.current);

        const callback = playerContext?.currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer(){
        playerContext?.setBlackTime(prev => { 
            if(prev === 1){
                if(timer.current)
                    clearInterval(timer.current);
                finish()
                return 0;
            }
            return prev - 1; 
        });
    }

    function decrementWhiteTimer(){
        playerContext?.setWhiteTime(prev => { 
            if(prev === 1){
                if(timer.current)
                    clearInterval(timer.current);
                finish()
                return 0;
            }
            return prev - 1; 
        });
    }

    return (
        <div className="timer">
            <h2>БЕЛЫЕ - {playerContext?.whiteTime}</h2>
            <h2>ЧЕРНЫЕ - {playerContext?.blackTime}</h2>
        </div>
    )
}