import { EGameStatus, TOperation } from '../types';
import { setError, undo } from './actions';
import { setClickedCell } from '../clickedCell/actions';
import { setBoard } from '../boards/actions';
import { getBoardWithUpdatedValue } from '../../utils/boardHelper';

/**
 * @function tryToUndo
 * @description Attempts to undo the last move. Does nothing if the game hasn't started.
 * If there's no history, triggers a temporary error animation.
 * Otherwise, reverts the last cell to empty and pops it from history.
 */
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
        return;
    }

    const cellToUndo = cells[cells.length - 1];

    dispatch(setClickedCell(cellToUndo));
    dispatch(
        setBoard(
            getBoardWithUpdatedValue(currentBoard, {
                ...cellToUndo,
                value: 0,
            })
        )
    );
    dispatch(undo);
};
