import React from 'react';
import { Board } from '../types/types';
import { Difficulties } from '../types/types';
import { Action } from './actions';

export enum GameStatus {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Failed = 'FAILED',
  Win = 'WIN',
}

export enum ModalComponents {
  DifficultyButtons = 'DifficultyButtons',
  WinBanner = 'WinBanner',
  Empty = 'empty',
}

export type ClickedCell = {
  y: number;
  x: number;
  value: number;
};

export type Modal = {
  isOpen: boolean;
  component: ModalComponents;
};

export interface AppContextInterface {
  difficulty?: keyof Difficulties;
  clickedCell: ClickedCell;
  currentBoard: Board;
  initialBoard: Board;
  solution: Board;
  modal: Modal;
  gameStatus: GameStatus;
}

export type State = {
  state: AppContextInterface;
  dispatch: React.Dispatch<Action>;
};

export type ActionCreator<Payload> = (payload: Payload) => Action;
