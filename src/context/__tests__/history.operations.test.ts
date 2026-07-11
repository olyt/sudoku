import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { tryToUndo } from '../history/operations';
import {
    EGameStatus,
    EGeneratorType,
    EModalComponents,
    IAppContext,
    TDispatch,
} from '../types';
import { EHistoryActionTypes } from '../history/actions';
import { EClickedCellActionTypes } from '../clickedCell/actions';
import { EBoardsActionTypes, setBoard } from '../boards/actions';
import { defaultCell, initialHistory, initialHints } from '../state';

const blankBoard = (): TBoard =>
    Array.from({ length: 9 }, () => Array<number>(9).fill(0));

const makeBoard = (): TBoard => {
    const board = blankBoard();

    board[1][2] = 5;

    return board;
};

const makeState = (overrides: Partial<IAppContext> = {}): IAppContext => ({
    clickedCell: defaultCell,
    boards: {
        currentBoard: makeBoard(),
        initialBoard: blankBoard(),
        solution: blankBoard(),
    },
    modal: { isOpen: false, component: EModalComponents.Empty },
    gameStatus: EGameStatus.InProgress,
    history: initialHistory,
    hints: initialHints,
    generatorType: EGeneratorType.Standard,
    ...overrides,
});

describe('tryToUndo operation', () => {
    let dispatch: Mock<TDispatch>;

    beforeEach(() => {
        dispatch = vi.fn<TDispatch>();
    });

    it('does nothing when gameStatus = NotStarted', () => {
        tryToUndo()(
            dispatch,
            makeState({ gameStatus: EGameStatus.NotStarted })
        );
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('dispatches setError(true) when history.cells is empty', () => {
        const state = makeState({
            history: { cells: [], error: false },
        });

        tryToUndo()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: EHistoryActionTypes.SetHistoryError,
            payload: true,
        });
    });

    it('dispatches setClickedCell, setBoard (zeroed), and undo when history has cells', () => {
        const cell1: ICell = { y: 0, x: 0, value: 3 };
        const cell2: ICell = { y: 1, x: 2, value: 5 };

        const state = makeState({
            history: { cells: [cell1, cell2], error: false },
        });

        tryToUndo()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(3);

        // First: setClickedCell with last cell
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: EClickedCellActionTypes.SetClickedCell,
            payload: cell2,
        });

        // Second: setBoard with cell2 zeroed out
        const setBoardAction = dispatch.mock.calls[1][0] as ReturnType<
            typeof setBoard
        >;

        expect(setBoardAction.type).toBe(EBoardsActionTypes.SetBoard);
        expect(setBoardAction.payload[cell2.y][cell2.x]).toBe(0);

        // Third: undo action
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: EHistoryActionTypes.Undo,
        });
    });
});
