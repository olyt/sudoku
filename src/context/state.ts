import {
  EGameStatus,
  EModalComponents,
  IAppContext,
  TBoardsState,
  TGameInfoState,
  THistory,
  TModalState,
} from './types';
import { getBlankBoard } from '../utils/boardHelper';
import { ICell } from '../types/types';

const initialBoardsState: TBoardsState = {
  currentBoard: getBlankBoard(),
  initialBoard: getBlankBoard(),
  solution: getBlankBoard(),
};

const initialModalState: TModalState = {
  isOpen: false,
  component: EModalComponents.Empty,
};

const initialGameInfo: TGameInfoState = {
  gameStatus: EGameStatus.NotStarted,
  chosenDifficulty: null,
};

export const initialClickedCell: ICell = {
  x: -1,
  y: -1,
  value: 0,
};

export const initialHistory: THistory = {
  cells: [],
  currentIndex: -1,
  goBackError: false,
  goForwardError: false,
};

export const context: IAppContext = {
  clickedCell: initialClickedCell,
  boards: initialBoardsState,
  modal: initialModalState,
  gameInfo: initialGameInfo,
  history: initialHistory,
};
