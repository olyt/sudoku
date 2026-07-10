import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { hint } from '../hints/operations';
import {
    EGameStatus,
    EGeneratorType,
    EModalComponents,
    IAppContext,
    TDispatch,
} from '../types';
import { EHintsActionTypes } from '../hints/actions';
import { defaultCell, initialHistory, initialHints } from '../state';

const blankBoard = (): TBoard =>
    Array.from({ length: 9 }, () => Array<number>(9).fill(0));

const solution: TBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const makeState = (overrides: Partial<IAppContext> = {}): IAppContext => ({
    clickedCell: defaultCell,
    boards: {
        currentBoard: blankBoard(),
        initialBoard: blankBoard(),
        solution,
    },
    modal: { isOpen: false, component: EModalComponents.Empty },
    gameStatus: EGameStatus.NotStarted,
    history: initialHistory,
    hints: initialHints,
    generatorType: EGeneratorType.Standard,
    ...overrides,
});

describe('hint operation', () => {
    let dispatch: Mock<TDispatch>;

    beforeEach(() => {
        dispatch = vi.fn<TDispatch>();
    });

    it('does nothing when gameStatus = NotStarted', () => {
        hint()(dispatch, makeState({ gameStatus: EGameStatus.NotStarted }));
        expect(dispatch).not.toHaveBeenCalled();
    });

    it('dispatches setError(true) when hints.count = 0', () => {
        const state = makeState({
            gameStatus: EGameStatus.InProgress,
            hints: { ...initialHints, count: 0 },
        });

        hint()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: EHintsActionTypes.SetHintError,
            payload: true,
        });
    });

    it('dispatches decrementHint and setCurrentHint when hints.count > 0', () => {
        const board = blankBoard();

        // Leave one empty cell at [0][0] — row 0 has 8 filled, so it gets suggested
        for (let x = 1; x < 9; x++) {
            board[0][x] = solution[0][x];
        }

        const state = makeState({
            gameStatus: EGameStatus.InProgress,
            hints: { ...initialHints, count: 3 },
            boards: {
                currentBoard: board,
                initialBoard: blankBoard(),
                solution,
            },
        });

        hint()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: EHintsActionTypes.DecrementHint,
        });

        expect(dispatch.mock.calls[1][0]).toMatchObject({
            type: EHintsActionTypes.SetCurrentHint,
            payload: { value: solution[0][0] },
        });
    });
});
