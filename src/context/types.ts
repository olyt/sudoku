import React from 'react';
import { ICell, IDifficulties, TBoard } from '../types/types';
import { TBoardsAction } from './boards/actions';
import { TGameInfoAction } from './gameInfo/actions';
import { TModalAction } from './modal/actions';
import { TClickedCellAction } from './clickedCell/actions';
import { THistoryAction } from './history/actions';

export enum EGameStatus {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Failed = 'FAILED',
  Win = 'WIN',
}

export enum EModalComponents {
  DifficultyBlock = 'DifficultyBlock',
  WinBanner = 'WinBanner',
  Empty = 'empty',
}

export type TBoardsState = {
  currentBoard: TBoard;
  initialBoard: TBoard;
  solution: TBoard;
};

export type TModalState = {
  isOpen: boolean;
  component: EModalComponents;
};

export type THistory = {
  cells: ICell[];
  error: boolean;
};

export type TGameInfoState = {
  chosenDifficulty: keyof IDifficulties | null;
  gameStatus: EGameStatus;
};

export interface IAppContext {
  clickedCell: ICell;
  boards: TBoardsState;
  modal: TModalState;
  gameInfo: TGameInfoState;
  history: THistory;
  hints: number;
}

export type TAction =
  | TBoardsAction
  | TGameInfoAction
  | TModalAction
  | TClickedCellAction
  | THistoryAction
  | TOperation;

export type TDispatch = React.Dispatch<TAction>;

export type TOperation = (
  dispatch: TDispatch,
  state: IAppContext
) => TAction | void;

export interface IState extends IAppContext {
  dispatch: TDispatch | ((action: TAction | TOperation) => void);
}

export type TActionCreator<T, M> = (payload: T) => M;

export type TActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
