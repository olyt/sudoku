/**
 * @description Hook for handling digit placement on the Sudoku board.
 * When called with a digit, returns a click handler that sets that value.
 * When called without a digit, returns a factory function to create handlers for any digit.
 */

import { MouseEventHandler, useCallback } from 'react';
import { useAppDispatch, useBoards, useClickedCell } from '../context/AppContext';
import { setValueToBoard } from '../context/operations';
import { setClickedCell } from '../context/clickedCell/actions';

/** Factory type that creates click handlers for a given digit */
export type THandlerCreator = <T extends number | undefined>(
    valueToSet: number
) => T extends undefined ? () => void : MouseEventHandler<HTMLDivElement>;

type TReturnType<T extends number | undefined> = T extends undefined
    ? THandlerCreator
    : MouseEventHandler<HTMLDivElement>;

type TCellValueHandlerHook = (
    newValue?: number
) => TReturnType<typeof newValue>;

/**
 * @function useCellValueHandler
 * @description Hook for setting a cell value on the board.
 * If a cell is selected and editable (not part of initial board), sets the value directly.
 * If no cell is selected, stores the digit for "digit-first" selection mode.
 * @param {number} newValue - optional digit to bind; if omitted, returns a handler factory
 * @returns {TReturnType} - either a bound click handler or a factory function to create handlers
 */
const useCellValueHandler: TCellValueHandlerHook = (newValue) => {
    const boards = useBoards();
    const { y, x } = useClickedCell();
    const dispatch = useAppDispatch();
    const createHandler = useCallback<THandlerCreator>(
        (valueToSet) => () => {
            if (y !== -1 && x !== -1 && !boards.initialBoard[y][x]) {
                dispatch(setValueToBoard(valueToSet));
            } else {
                dispatch(setClickedCell({ y: -1, x: -1, value: valueToSet }));
            }
        },
        [boards.initialBoard, y, x, dispatch]
    );

    if (!newValue) {
        return createHandler;
    }

    return createHandler<number>(newValue);
};

export default useCellValueHandler;
