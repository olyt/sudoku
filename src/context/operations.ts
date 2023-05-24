import { generateBoard } from '../utils/generateBoard';
import { EGameStatus, EModalComponents, TOperation } from './types';
import { IDifficulties } from '../types/types';
import {
  copyBoard,
  getBlankBoard,
  updateValueOnBoard,
} from '../utils/boardHelper';
import { setBoard, setInitialBoard, setSolution } from './boards/actions';
import { setGameDifficulty, setGameStatus } from './gameInfo/actions';
import { resetClickedCell, setClickedCellValue } from './clickedCell/actions';
import { setModalComponent } from './modal/actions';
import { pushToHistory, resetHistory } from './history/actions';
import { resetHints } from './hints/actions';

export const startGame =
  (difficulty: keyof IDifficulties): TOperation =>
  (dispatch) => {
    const [board, solution] = generateBoard(difficulty);

    dispatch(setInitialBoard(copyBoard(board)));
    dispatch(setBoard(board));
    dispatch(setSolution(solution));
    dispatch(setGameDifficulty(difficulty));
    dispatch(setGameStatus(EGameStatus.InProgress));
    dispatch(resetClickedCell);
    dispatch(resetHistory);
    dispatch(resetHints);
  };

export const resetGame = (): TOperation => (dispatch, state) => {
  const { boards, gameInfo } = state;

  dispatch(setBoard(boards.initialBoard));
  dispatch(resetHistory);
  dispatch(resetHints);

  if (gameInfo.gameStatus === EGameStatus.Failed) {
    dispatch(setGameStatus(EGameStatus.InProgress));
  }
};

export const leaveAfterWin = (): TOperation => (dispatch) => {
  dispatch(setBoard(getBlankBoard()));
  dispatch(setInitialBoard(getBlankBoard()));
  dispatch(setSolution(getBlankBoard()));
  dispatch(resetClickedCell);
  dispatch(resetHistory);
  dispatch(resetHints);
  dispatch(setGameStatus(EGameStatus.NotStarted));
  dispatch(setGameDifficulty(null));
};

export const startNewAfterWin = (): TOperation => (dispatch) => {
  dispatch(setModalComponent(EModalComponents.DifficultyBlock));
};

export const setValueToBoard =
  (newValue: number): TOperation =>
  (dispatch, state) => {
    const { boards, clickedCell } = state;
    const { y, x } = clickedCell;
    const updatedBoard = updateValueOnBoard(boards.currentBoard, {
      y,
      x,
      value: newValue,
    });

    dispatch(setBoard(updatedBoard));
    dispatch(setClickedCellValue(newValue));
    dispatch(pushToHistory({ ...clickedCell, value: newValue }));
  };
