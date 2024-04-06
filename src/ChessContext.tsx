import { Dispatch, SetStateAction, createContext } from "react";
import { Player } from "./Models/Player";

export interface ChessContextProps{
  isFinish: boolean;
  finishByTimer: () => void;
  restart: () => void;
}

export interface PlayerContextProps{
  whiteTime: number;
  blackTime: number;
  setWhiteTime: Dispatch<SetStateAction<number>>;
  setBlackTime: Dispatch<SetStateAction<number>>;
  currentPlayer: Player | null;
}

export const ChessContext = createContext<ChessContextProps | undefined>(undefined);

export const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);