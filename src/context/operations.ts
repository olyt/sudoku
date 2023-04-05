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
  };

export const leaveAfterWin = (): TOperation => (dispatch) => {
  dispatch(setBoard(getBlankBoard()));
  dispatch(setInitialBoard(getBlankBoard()));
  dispatch(setSolution(getBlankBoard()));
  dispatch(resetClickedCell);
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

    if (boards.solution[y][x] !== updatedBoard[y][x]) {
      dispatch(setGameStatus(EGameStatus.Failed));
    }
  };
