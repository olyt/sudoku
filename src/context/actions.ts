import { generateBoard } from '../utils/generateBoard';
import {
  TActionCreator,
  IAppContext,
  TClickedCell,
  EGameStatus,
  EModalComponents,
} from './types';
import { TBoard, IDifficulties } from '../types/types';
import React from 'react';
import {
  copyBlankBoard,
  copyBoard,
  updateValueOnBoard,
} from '../utils/boardHelper';

type TActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum EActionTypes {
  SetDifficulty = 'SET_DIFFICULTY',
  SetClickedCell = 'SET_CLICKED_CELL',
  SetClickedCellValue = 'SET_CLICKED_CELL_VALUE',
  ResetClickedCell = 'RESET_CLICKED_CELL',
  SetBoard = 'SET_BOARD',
  SetInitialBoard = 'SET_INITIAL_BOARD',
  SetSolution = 'SET_SOLUTION',
  SetModalOpen = 'SET_MODAL_OPEN',
  SetModalComponent = 'SET_MODAL_COMPONENT',
  SetGameStatus = 'SET_GAME_STATUS',
}

type TPayload = {
  [EActionTypes.SetBoard]: TBoard;
  [EActionTypes.SetInitialBoard]: TBoard;
  [EActionTypes.SetSolution]: TBoard;
  [EActionTypes.SetDifficulty]: keyof IDifficulties;
  [EActionTypes.SetClickedCell]: TClickedCell;
  [EActionTypes.ResetClickedCell]: undefined;
  [EActionTypes.SetClickedCellValue]: number;
  [EActionTypes.SetModalOpen]: boolean;
  [EActionTypes.SetModalComponent]: EModalComponents;
  [EActionTypes.SetGameStatus]: EGameStatus;
};

export type TAction = TActionMap<TPayload>[keyof TActionMap<TPayload>];

export const setClickedCellValue: (payload: number) => TAction = (payload) => ({
  type: EActionTypes.SetClickedCellValue,
  payload,
});

export const setModal: TActionCreator<boolean> = (payload) => ({
  type: EActionTypes.SetModalOpen,
  payload,
});

export const setModalComponent: TActionCreator<EModalComponents> = (
  payload
) => ({
  type: EActionTypes.SetModalComponent,
  payload,
});

export const setClickedCell: TActionCreator<TClickedCell> = (payload) => ({
  type: EActionTypes.SetClickedCell,
  payload,
});

export const setGameStatus: TActionCreator<EGameStatus> = (payload) => ({
  type: EActionTypes.SetGameStatus,
  payload,
});

export const resetGameStatus: TAction = {
  type: EActionTypes.SetGameStatus,
  payload: EGameStatus.InProgress,
};

export const failGameStatus: TAction = {
  type: EActionTypes.SetGameStatus,
  payload: EGameStatus.Failed,
};

export const winGameStatus: TAction = {
  type: EActionTypes.SetGameStatus,
  payload: EGameStatus.Win,
};

export const notStartedStatus: TAction = {
  type: EActionTypes.SetGameStatus,
  payload: EGameStatus.NotStarted,
};

export const resetClickedCell: TAction = {
  type: EActionTypes.ResetClickedCell,
};

export const setBoard: TActionCreator<TBoard> = (board) => ({
  type: EActionTypes.SetBoard,
  payload: board,
});

export const setSolution: TActionCreator<TBoard> = (board) => ({
  type: EActionTypes.SetSolution,
  payload: board,
});

export const setInitialBoard: TActionCreator<TBoard> = (board) => ({
  type: EActionTypes.SetInitialBoard,
  payload: board,
});

export const startGame: (
  difficulty: keyof IDifficulties,
  dispatch: React.Dispatch<TAction>
) => void = (difficulty, dispatch) => {
  const { board, solution } = generateBoard(difficulty);

  dispatch(setInitialBoard(copyBoard(board)));
  dispatch(setBoard(board));
  dispatch(setSolution(solution));
  dispatch(setGameStatus(EGameStatus.InProgress));
};

export const resetBoardToInitial: (board: TBoard) => TAction = (board) => ({
  type: EActionTypes.SetBoard,
  payload: copyBoard(board),
});

export const leaveAfterWin = (dispatch: React.Dispatch<TAction>): void => {
  dispatch(setBoard(copyBlankBoard()));
  dispatch(setInitialBoard(copyBlankBoard()));
  dispatch(setSolution(copyBlankBoard()));
  dispatch(resetClickedCell);
  dispatch(notStartedStatus);
};

export const startNewAfterWin = (dispatch: React.Dispatch<TAction>): void => {
  dispatch(setModalComponent(EModalComponents.DifficultyButtons));
};

export const setValueToBoard: (
  state: IAppContext,
  dispatch: React.Dispatch<TAction>,
  newValue: number
) => void = (state, dispatch, newValue) => {
  const { y, x } = state.clickedCell;
  const updatedBoard = updateValueOnBoard(state.currentBoard, {
    y,
    x,
    value: newValue,
  });
  const actionToUpdateBoard: TAction = {
    type: EActionTypes.SetBoard,
    payload: updatedBoard,
  };

  dispatch(actionToUpdateBoard);

  if (state.solution[y][x] !== updatedBoard[y][x]) {
    dispatch(setGameStatus(EGameStatus.Failed));
  }
};
