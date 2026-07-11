import { describe, it, expect } from 'vitest';
import reducer from '../generator/reducer';
import { EGeneratorActionTypes, setGeneratorType } from '../generator/actions';
import { EGeneratorType } from '../types';

describe('generator reducer', () => {
    it('SetGeneratorType with Symmetric', () => {
        const next = reducer(EGeneratorType.Standard, {
            type: EGeneratorActionTypes.SetGeneratorType,
            payload: EGeneratorType.Symmetric,
        });

        expect(next).toBe(EGeneratorType.Symmetric);
    });

    it('SetGeneratorType with Isomorphic', () => {
        const next = reducer(EGeneratorType.Standard, {
            type: EGeneratorActionTypes.SetGeneratorType,
            payload: EGeneratorType.Isomorphic,
        });

        expect(next).toBe(EGeneratorType.Isomorphic);
    });

    it('SetGeneratorType with Technique', () => {
        const next = reducer(EGeneratorType.Standard, {
            type: EGeneratorActionTypes.SetGeneratorType,
            payload: EGeneratorType.Technique,
        });

        expect(next).toBe(EGeneratorType.Technique);
    });

    it('SetGeneratorType with Standard', () => {
        const next = reducer(EGeneratorType.Symmetric, {
            type: EGeneratorActionTypes.SetGeneratorType,
            payload: EGeneratorType.Standard,
        });

        expect(next).toBe(EGeneratorType.Standard);
    });

    it('default returns state unchanged', () => {
        const next = reducer(EGeneratorType.Standard, {
            type: 'UNKNOWN',
        } as never);

        expect(next).toBe(EGeneratorType.Standard);
    });

    it('setGeneratorType action creator produces correct action', () => {
        const action = setGeneratorType(EGeneratorType.Symmetric);

        expect(action.type).toBe(EGeneratorActionTypes.SetGeneratorType);
        expect(action.payload).toBe(EGeneratorType.Symmetric);
    });
});
