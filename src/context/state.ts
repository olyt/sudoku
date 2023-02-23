import {
  EGameStatus,
  EModalComponents,
  IAppContext,
  TBoardsState,
  TGameInfoState,
  TModalState,
} from './types';
import { copyBlankBoard } from '../utils/boardHelper';
import { TCell } from '../types/types';

const initialBoardsState: TBoardsState = {
  currentBoard: copyBlankBoard(),
  initialBoard: copyBlankBoard(),
  solution: copyBlankBoard(),
};

const initialModalState: TModalState = {
  isOpen: false,
  component: EModalComponents.Empty,
};

const initialGameInfo: TGameInfoState = {
  gameStatus: EGameStatus.NotStarted,
  chosenDifficulty: null,
};

export const initialClickedCell: TCell = {
  x: -1,
  y: -1,
  value: 0,
};

export const context: IAppContext = {
  clickedCell: initialClickedCell,
  boards: initialBoardsState,
  modal: initialModalState,
  gameInfo: initialGameInfo,
};
