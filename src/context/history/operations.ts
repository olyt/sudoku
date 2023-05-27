import { EGameStatus, TOperation } from '../types';
import { setError, undo } from './actions';
import { setClickedCell } from '../clickedCell/actions';
import { setBoard } from '../boards/actions';
import { updateValueOnBoard } from '../../utils/boardHelper';

export const tryToUndo = (): TOperation => (dispatch, state) => {
  const {
    history: { cells },
    gameStatus,
    boards: { currentBoard },
  } = state;

  if (gameStatus === EGameStatus.NotStarted) {
    return;
  }

  if (!cells.length) {
    dispatch(setError(true));
    setTimeout(() => dispatch(setError(false)), 400);
    return;
  }

  const cellToUndo = cells[cells.length - 1];
  dispatch(setClickedCell(cellToUndo));
  dispatch(
    setBoard(
      updateValueOnBoard(currentBoard, {
        ...cellToUndo,
        value: 0,
      })
    )
  );
  dispatch(undo);
};
