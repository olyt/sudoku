import {
  EGameStatus,
  EModalComponents,
  IAppContext,
  TBoardsState,
  THints,
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

const initialGameStatus = EGameStatus.NotStarted;

export const defaultCell: ICell = {
  x: -1,
  y: -1,
  value: 0,
};

export const initialHistory: THistory = {
  cells: [],
  error: false,
};

export const initialHints: THints = {
  count: 5,
  currentHint: defaultCell,
  error: false,
};

export const context: IAppContext = {
  clickedCell: defaultCell,
  boards: initialBoardsState,
  modal: initialModalState,
  gameStatus: initialGameStatus,
  history: initialHistory,
  hints: initialHints,
};
