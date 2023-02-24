import { generateBoard } from '../utils/generateBoard';
import { EGameStatus, EModalComponents, TAction, TBoardsState } from './types';
import { IDifficulties, TCell } from '../types/types';
import React from 'react';
import {
  copyBlankBoard,
  copyBoard,
  updateValueOnBoard,
} from '../utils/boardHelper';
import { setBoard, setInitialBoard, setSolution } from './boards/actions';
import { setGameDifficulty, setGameStatus } from './gameInfo/actions';
import { resetClickedCell } from './clickedCell/actions';
import { setModalComponent } from './modal/actions';

export const startGame: (
  difficulty: keyof IDifficulties,
  dispatch: React.Dispatch<TAction>
) => void = (difficulty, dispatch) => {
  const [board, solution] = generateBoard(difficulty);

  dispatch(setInitialBoard(copyBoard(board)));
  dispatch(setBoard(board));
  dispatch(setSolution(solution));
  dispatch(setGameDifficulty(difficulty));
  dispatch(setGameStatus(EGameStatus.InProgress));
};

export const leaveAfterWin = (dispatch: React.Dispatch<TAction>): void => {
  dispatch(setBoard(copyBlankBoard()));
  dispatch(setInitialBoard(copyBlankBoard()));
  dispatch(setSolution(copyBlankBoard()));
  dispatch(resetClickedCell);
  dispatch(setGameStatus(EGameStatus.NotStarted));
  dispatch(setGameDifficulty(null));
};

export const startNewAfterWin = (dispatch: React.Dispatch<TAction>): void => {
  dispatch(setModalComponent(EModalComponents.DifficultyBlock));
};

export const setValueToBoard: (
  boards: TBoardsState,
  clickedCell: TCell,
  dispatch: React.Dispatch<TAction>,
  newValue: number
) => void = (boards, clickedCell, dispatch, newValue) => {
  const { y, x } = clickedCell;
  const updatedBoard = updateValueOnBoard(boards.currentBoard, {
    y,
    x,
    value: newValue,
  });

  dispatch(setBoard(updatedBoard));

  if (boards.solution[y][x] !== updatedBoard[y][x]) {
    dispatch(setGameStatus(EGameStatus.Failed));
  }
};
