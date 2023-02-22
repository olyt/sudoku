import React from 'react';
import { TBoard } from '../types/types';
import { IDifficulties } from '../types/types';
import { TAction } from './actions';

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

export type TClickedCell = {
  y: number;
  x: number;
  value: number;
};

export type TModal = {
  isOpen: boolean;
  component: EModalComponents;
};

export interface IAppContext {
  difficulty?: keyof IDifficulties;
  clickedCell: TClickedCell;
  currentBoard: TBoard;
  initialBoard: TBoard;
  solution: TBoard;
  modal: TModal;
  gameStatus: EGameStatus;
}

export type TState = {
  state: IAppContext;
  dispatch: React.Dispatch<TAction>;
};

export type TActionCreator<Payload> = (payload: Payload) => TAction;
