import { generateBoard } from '../utils/generateBoard';
import {
  ActionCreator,
  AppContextInterface,
  ClickedCell,
  GameStatus,
  ModalComponents,
} from './types';
import { Board, Difficulties } from '../types/types';
import React from 'react';
import {
  copyBlankBoard,
  copyBoard,
  updateValueOnBoard,
} from '../utils/boardHelper';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
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

type Payload = {
  [ActionTypes.SetBoard]: Board;
  [ActionTypes.SetInitialBoard]: Board;
  [ActionTypes.SetSolution]: Board;
  [ActionTypes.SetDifficulty]: keyof Difficulties;
  [ActionTypes.SetClickedCell]: ClickedCell;
  [ActionTypes.ResetClickedCell]: undefined;
  [ActionTypes.SetClickedCellValue]: number;
  [ActionTypes.SetModalOpen]: boolean;
  [ActionTypes.SetModalComponent]: ModalComponents;
  [ActionTypes.SetGameStatus]: GameStatus;
};

export type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

export const setClickedCellValue: (payload: number) => Action = (payload) => ({
  type: ActionTypes.SetClickedCellValue,
  payload,
});

export const setModal: ActionCreator<boolean> = (payload) => ({
  type: ActionTypes.SetModalOpen,
  payload,
});

export const setModalComponent: ActionCreator<ModalComponents> = (payload) => ({
  type: ActionTypes.SetModalComponent,
  payload,
});

export const setClickedCell: ActionCreator<ClickedCell> = (payload) => ({
  type: ActionTypes.SetClickedCell,
  payload,
});

export const setGameStatus: ActionCreator<GameStatus> = (payload) => ({
  type: ActionTypes.SetGameStatus,
  payload,
});

export const resetGameStatus: Action = {
  type: ActionTypes.SetGameStatus,
  payload: GameStatus.InProgress,
};

export const failGameStatus: Action = {
  type: ActionTypes.SetGameStatus,
  payload: GameStatus.Failed,
};

export const winGameStatus: Action = {
  type: ActionTypes.SetGameStatus,
  payload: GameStatus.Win,
};

export const notStartedStatus: Action = {
  type: ActionTypes.SetGameStatus,
  payload: GameStatus.NotStarted,
};

export const resetClickedCell: Action = {
  type: ActionTypes.ResetClickedCell,
};

export const setBoard: ActionCreator<Board> = (board) => ({
  type: ActionTypes.SetBoard,
  payload: board,
});

export const setSolution: ActionCreator<Board> = (board) => ({
  type: ActionTypes.SetSolution,
  payload: board,
});

export const setInitialBoard: ActionCreator<Board> = (board) => ({
  type: ActionTypes.SetInitialBoard,
  payload: board,
});

export const startGame: (
  difficulty: keyof Difficulties,
  dispatch: React.Dispatch<Action>
) => void = (difficulty, dispatch) => {
  const { board, solution } = generateBoard(difficulty);

  dispatch(setInitialBoard(copyBoard(board)));
  dispatch(setBoard(board));
  dispatch(setSolution(solution));
  dispatch(setGameStatus(GameStatus.InProgress));
};

export const resetBoardToInitial: (board: Board) => Action = (board) => ({
  type: ActionTypes.SetBoard,
  payload: copyBoard(board),
});

export const leaveAfterWin = (dispatch: React.Dispatch<Action>): void => {
  dispatch(setBoard(copyBlankBoard()));
  dispatch(setInitialBoard(copyBlankBoard()));
  dispatch(setSolution(copyBlankBoard()));
  dispatch(resetClickedCell);
  dispatch(notStartedStatus);
};

export const startNewAfterWin = (dispatch: React.Dispatch<Action>): void => {
  dispatch(setModalComponent(ModalComponents.DifficultyButtons));
};

export const setValueToBoard: (
  state: AppContextInterface,
  dispatch: React.Dispatch<Action>,
  newValue: number
) => void = (state, dispatch, newValue) => {
  const { y, x } = state.clickedCell;
  const updatedBoard = updateValueOnBoard(state.currentBoard, {
    y,
    x,
    value: newValue,
  });
  const actionToUpdateBoard: Action = {
    type: ActionTypes.SetBoard,
    payload: updatedBoard,
  };

  dispatch(actionToUpdateBoard);

  if (state.solution[y][x] !== updatedBoard[y][x]) {
    dispatch(setGameStatus(GameStatus.Failed));
  }
};
