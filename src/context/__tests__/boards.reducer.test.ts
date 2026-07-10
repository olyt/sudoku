import { describe, it, expect } from 'vitest';
import reducer from '../boards/reducer';
import {
    EBoardsActionTypes,
    setBoard,
    setBoardToInitial,
    setInitialBoard,
    setSolution,
} from '../boards/actions';
import { TBoardsState } from '../types';

const blankBoard = (): TBoard =>
    Array.from({ length: 9 }, () => Array<number>(9).fill(0));

const initialState: TBoardsState = {
    currentBoard: blankBoard(),
    initialBoard: blankBoard(),
    solution: blankBoard(),
};

const filledBoard: TBoard = Array.from({ length: 9 }, (_, i) =>
    Array.from({ length: 9 }, (__, j) => (i * 9 + j + 1) % 9 + 1)
);

describe('boards reducer', () => {
    it('SetBoard updates currentBoard and preserves others', () => {
        const next = reducer(initialState, setBoard(filledBoard));

        expect(next.currentBoard).toBe(filledBoard);
        expect(next.initialBoard).toBe(initialState.initialBoard);
        expect(next.solution).toBe(initialState.solution);
    });

    it('SetInitialBoard updates initialBoard and preserves others', () => {
        const next = reducer(initialState, setInitialBoard(filledBoard));

        expect(next.initialBoard).toBe(filledBoard);
        expect(next.currentBoard).toBe(initialState.currentBoard);
        expect(next.solution).toBe(initialState.solution);
    });

    it('SetSolution updates solution and preserves others', () => {
        const next = reducer(initialState, setSolution(filledBoard));

        expect(next.solution).toBe(filledBoard);
        expect(next.currentBoard).toBe(initialState.currentBoard);
        expect(next.initialBoard).toBe(initialState.initialBoard);
    });

    it('setBoardToInitial deep-copies the board and sets currentBoard', () => {
        const source: TBoard = blankBoard();

        source[0][0] = 3;

        const action = setBoardToInitial(source);

        expect(action.type).toBe(EBoardsActionTypes.SetBoard);

        const next = reducer(initialState, action);

        // Value preserved
        expect(next.currentBoard[0][0]).toBe(3);
        // Deep copy — mutation doesn't bleed back
        source[0][0] = 99;
        expect(next.currentBoard[0][0]).toBe(3);
    });

    it('default returns state unchanged', () => {
        const next = reducer(initialState, { type: 'UNKNOWN' } as never);

        expect(next).toBe(initialState);
    });
});
