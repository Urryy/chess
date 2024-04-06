import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './Components/BoardComponent';
import { Board } from './Models/Board';
import { Player } from './Models/Player';
import { Colors } from './Models/Colors';
import { LostFigures } from './Components/LostFigures';
import { Timer } from './Components/Timer';
import { FinishModal } from './Components/ModalWindow';
import { ChessContextProps, ChessContext, PlayerContextProps, PlayerContext } from './ChessContext';
import { Time } from './Constants/Constants';

function App() {
  const [isFinish, setIsFinish] = useState(false);
  const [board, setBoard] = useState<Board>(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [whitePlayerTime, setWhitePlayerTime] = useState(Time);
  const [blackPlayerTime, setBlackPlayerTime] = useState(Time);
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const contextChess: ChessContextProps = { isFinish: isFinish, finishByTimer: finishByTimer, restart: restart };
  const contextPlayer: PlayerContextProps = { setBlackTime: setBlackPlayerTime, setWhiteTime: setWhitePlayerTime, 
    currentPlayer: currentPlayer, whiteTime: whitePlayerTime, blackTime: blackPlayerTime };

  useEffect(() => {
    restart();
  }, [])

  function restart(){
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigure();
    initializePlayers()
    setBoard(newBoard);
  }

  function initializePlayers(){
    let playerWhite = new Player(Colors.WHITE);
    let playerBlack = new Player(Colors.BLACK);
    setWhitePlayer(playerWhite);
    setBlackPlayer(playerBlack);
    setCurrentPlayer(playerWhite);
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function finishByTimer(){
    currentPlayer?.CheckMate(!isFinish);
    setIsFinish(!isFinish);
  }

  return (
    <ChessContext.Provider value={contextChess}>
      <PlayerContext.Provider value={contextPlayer}>
        <div className='app'>
          <FinishModal isOpen={isFinish} setIsOpen={setIsFinish} title='конец игры'>
            <div>
              {<div>игрок с цветом {currentPlayer?.color === Colors.WHITE ? <span>белых</span> : <span>черных</span>} проиграл</div>}
            </div>
          </FinishModal>
          <div>
            <Timer finish={finishByTimer}/>
          </div>
          <BoardComponent board={board} 
            setBoard={setBoard}
            swapPlayer={swapPlayer}
            restart={restart}/>
          <div className='lost-component'>
            <LostFigures title="Черные фигуры" figures={board.lostBlackFigures}/>
            <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} className='east'/>
          </div>
        </div>
      </PlayerContext.Provider>
    </ChessContext.Provider>

  );
}

export default App;
