import { describe, it, expect } from 'vitest';
import reducer from '../gameStatus/reducer';
import { EGameInfoActionTypes } from '../gameStatus/actions';
import { EGameStatus } from '../types';

describe('gameStatus reducer', () => {
    it('SetGameStatus with InProgress', () => {
        const next = reducer(EGameStatus.NotStarted, {
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.InProgress,
        });

        expect(next).toBe(EGameStatus.InProgress);
    });

    it('SetGameStatus with Failed', () => {
        const next = reducer(EGameStatus.InProgress, {
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.Failed,
        });

        expect(next).toBe(EGameStatus.Failed);
    });

    it('SetGameStatus with Win', () => {
        const next = reducer(EGameStatus.InProgress, {
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.Win,
        });

        expect(next).toBe(EGameStatus.Win);
    });

    it('SetGameStatus with NotStarted', () => {
        const next = reducer(EGameStatus.Win, {
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.NotStarted,
        });

        expect(next).toBe(EGameStatus.NotStarted);
    });

    it('default returns state unchanged', () => {
        const next = reducer(EGameStatus.InProgress, {
            type: 'UNKNOWN',
        } as never);

        expect(next).toBe(EGameStatus.InProgress);
    });
});
