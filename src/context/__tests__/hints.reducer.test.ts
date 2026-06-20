import { describe, it, expect } from 'vitest';
import reducer from '../hints/reducer';
import { EHintsActionTypes } from '../hints/actions';
import { defaultCell, initialHints } from '../state';
import { THints } from '../types';

const baseState: THints = {
    count: 3,
    currentHint: defaultCell,
    error: false,
};

const hintCell: ICell = { y: 2, x: 4, value: 7 };

describe('hints reducer', () => {
    it('DecrementHint decrements count', () => {
        const next = reducer(baseState, { type: EHintsActionTypes.DecrementHint });

        expect(next.count).toBe(2);
    });

    it('SetCurrentHint sets currentHint', () => {
        const next = reducer(baseState, {
            type: EHintsActionTypes.SetCurrentHint,
            payload: hintCell,
        });

        expect(next.currentHint).toBe(hintCell);
    });

    it('ResetCurrentHint resets to defaultCell', () => {
        const state: THints = { ...baseState, currentHint: hintCell };
        const next = reducer(state, { type: EHintsActionTypes.ResetCurrentHint });

        expect(next.currentHint).toBe(defaultCell);
    });

    it('SetHintError sets error flag', () => {
        const next = reducer(baseState, {
            type: EHintsActionTypes.SetHintError,
            payload: true,
        });

        expect(next.error).toBe(true);
    });

    it('ResetHints returns initialHints', () => {
        const state: THints = { count: 0, currentHint: hintCell, error: true };
        const next = reducer(state, { type: EHintsActionTypes.ResetHints });

        expect(next).toEqual(initialHints);
    });

    it('default returns state unchanged', () => {
        const next = reducer(baseState, { type: 'UNKNOWN' } as never);

        expect(next).toBe(baseState);
    });
});
