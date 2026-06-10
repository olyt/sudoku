import { describe, it, expect } from 'vitest';
import reducer from '../history/reducer';
import { EHistoryActionTypes } from '../history/actions';
import { initialHistory } from '../state';
import { THistory } from '../types';

const makeCell = (n: number): ICell => ({ y: n, x: n, value: n });

const stateWithCells = (count: number): THistory => ({
    cells: Array.from({ length: count }, (_, i) => makeCell(i + 1)),
    error: false,
});

describe('history reducer', () => {
    it('PushToHistory appends when cells.length <= 4', () => {
        const state = stateWithCells(4);
        const cell = makeCell(5);
        const next = reducer(state, {
            type: EHistoryActionTypes.PushToHistory,
            payload: cell,
        });

        expect(next.cells).toHaveLength(5);
        expect(next.cells[4]).toBe(cell);
    });

    it('PushToHistory drops first entry when cells.length = 5', () => {
        const state = stateWithCells(5);
        const cell = makeCell(6);
        const next = reducer(state, {
            type: EHistoryActionTypes.PushToHistory,
            payload: cell,
        });

        expect(next.cells).toHaveLength(5);
        expect(next.cells[0]).toEqual(makeCell(2)); // first was dropped
        expect(next.cells[4]).toBe(cell);
    });

    it('Undo removes the last cell', () => {
        const state = stateWithCells(3);
        const next = reducer(state, { type: EHistoryActionTypes.Undo });

        expect(next.cells).toHaveLength(2);
        expect(next.cells[1]).toEqual(makeCell(2));
    });

    it('SetHistoryError sets error flag', () => {
        const state = stateWithCells(0);
        const next = reducer(state, {
            type: EHistoryActionTypes.SetHistoryError,
            payload: true,
        });

        expect(next.error).toBe(true);
    });

    it('ResetHistory returns initialHistory', () => {
        const state: THistory = { cells: [makeCell(1)], error: true };
        const next = reducer(state, { type: EHistoryActionTypes.ResetHistory });

        expect(next).toEqual(initialHistory);
    });

    it('default returns state unchanged', () => {
        const state = stateWithCells(2);
        const next = reducer(state, { type: 'UNKNOWN' } as never);

        expect(next).toBe(state);
    });
});
