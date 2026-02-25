/**
 * @description Thunk operations for complex game actions that require dispatching
 * multiple actions or accessing current state. These are the primary entry points
 * for game lifecycle events.
 */

import { generateBoard } from '../utils/generateBoard';
import { EGameStatus, EModalComponents, TOperation } from './types';
import { IDifficulties } from '../@types/global';
import {
    copyBoard,
    getBlankBoard,
    getBoardWithUpdatedValue,
} from '../utils/boardHelper';
import { setBoard, setInitialBoard, setSolution } from './boards/actions';
import { setGameStatus } from './gameStatus/actions';
import { resetClickedCell, setClickedCellValue } from './clickedCell/actions';
import { setModalComponent } from './modal/actions';
import { pushToHistory, resetHistory } from './history/actions';
import { resetHints } from './hints/actions';

/**
 * @function startGame
 * @description Starts a new game: generates a puzzle at the given difficulty, stores the board,
 * solution, and initial board snapshot, then resets all game state
 * @param {keyof IDifficulties} difficulty - the difficulty level to generate
 */
export const startGame =
    (difficulty: keyof IDifficulties): TOperation =>
    (dispatch) => {
        const [board, solution] = generateBoard(difficulty);

        dispatch(setInitialBoard(copyBoard(board)));
        dispatch(setBoard(board));
        dispatch(setSolution(solution));
        dispatch(setGameStatus(EGameStatus.InProgress));
        dispatch(resetClickedCell);
        dispatch(resetHistory);
        dispatch(resetHints);
    };

/**
 * @function resetGame
 * @description Resets the current game to its initial board state.
 * Clears history and hints. If the game was failed, restores InProgress status.
 */
export const resetGame = (): TOperation => (dispatch, state) => {
    const { boards, gameStatus } = state;

    dispatch(setBoard(boards.initialBoard));
    dispatch(resetHistory);
    dispatch(resetHints);

    if (gameStatus === EGameStatus.Failed) {
        dispatch(setGameStatus(EGameStatus.InProgress));
    }
};

/**
 * @function leaveAfterWin
 * @description Clears all game data and returns to the NotStarted state after a win
 */
export const leaveAfterWin = (): TOperation => (dispatch) => {
    dispatch(setBoard(getBlankBoard()));
    dispatch(setInitialBoard(getBlankBoard()));
    dispatch(setSolution(getBlankBoard()));
    dispatch(resetClickedCell);
    dispatch(resetHistory);
    dispatch(resetHints);
    dispatch(setGameStatus(EGameStatus.NotStarted));
};

/**
 * @function startNewAfterWin
 * @description Opens the difficulty selection modal to start a new game after winning
 */
export const startNewAfterWin = (): TOperation => (dispatch) => {
    dispatch(setModalComponent(EModalComponents.DifficultyBlock));
};

/**
 * @function setValueToBoard
 * @description Sets a digit on the board at the currently clicked cell position.
 * Updates the board, the clicked cell's value, and pushes to undo history.
 * @param {number} newValue - the digit (1-9) to place on the board
 */
export const setValueToBoard =
    (newValue: number): TOperation =>
    (dispatch, state) => {
        const { boards, clickedCell } = state;
        const { y, x } = clickedCell;
        const updatedBoard = getBoardWithUpdatedValue(boards.currentBoard, {
            y,
            x,
            value: newValue,
        });

        dispatch(setBoard(updatedBoard));
        dispatch(setClickedCellValue(newValue));
        dispatch(pushToHistory({ ...clickedCell, value: newValue }));
    };
