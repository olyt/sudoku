import { describe, it, expect } from 'vitest';
import { deriveCellState, ECellStates } from '../cellState';

type TFlags = {
    sameCell: boolean;
    sameY: boolean;
    sameX: boolean;
    sameValue: boolean;
    digitClicked: boolean;
    areaFinished: boolean;
    isHint: boolean;
};

const derive = (overrides: Partial<TFlags> = {}): ECellStates => {
    const flags: TFlags = {
        sameCell: false,
        sameY: false,
        sameX: false,
        sameValue: false,
        digitClicked: false,
        areaFinished: false,
        isHint: false,
        ...overrides,
    };

    return deriveCellState(
        flags.sameCell,
        flags.sameY,
        flags.sameX,
        flags.sameValue,
        flags.digitClicked,
        flags.areaFinished,
        flags.isHint
    );
};

describe('deriveCellState', () => {
    it('returns inactive when no flags are set', () => {
        expect(derive()).toBe(ECellStates.inactive);
    });

    it('returns hint when the cell is the current hint, over any other flag', () => {
        expect(derive({ isHint: true })).toBe(ECellStates.hint);
        expect(
            derive({
                isHint: true,
                sameCell: true,
                sameY: true,
                sameX: true,
                areaFinished: true,
            })
        ).toBe(ECellStates.hint);
    });

    it('returns clicked for the clicked cell, over highlight and finished', () => {
        expect(derive({ sameCell: true })).toBe(ECellStates.clicked);
        expect(
            derive({
                sameCell: true,
                sameY: true,
                sameX: true,
                areaFinished: true,
            })
        ).toBe(ECellStates.clicked);
    });

    it('returns highlighted for cells sharing only the row or only the column', () => {
        expect(derive({ sameY: true })).toBe(ECellStates.highlighted);
        expect(derive({ sameX: true })).toBe(ECellStates.highlighted);
    });

    it('does not highlight when the cell shares both row and column', () => {
        expect(derive({ sameY: true, sameX: true })).toBe(
            ECellStates.inactive
        );
    });

    it('returns similarNum when a digit is clicked and values match', () => {
        expect(derive({ digitClicked: true, sameValue: true })).toBe(
            ECellStates.similarNum
        );
    });

    it('does not return similarNum when only one of digitClicked/sameValue is set', () => {
        expect(derive({ digitClicked: true })).toBe(ECellStates.inactive);
        expect(derive({ sameValue: true })).toBe(ECellStates.inactive);
    });

    it('returns finished for cells in a completed area', () => {
        expect(derive({ areaFinished: true })).toBe(ECellStates.finished);
    });

    it('prefers highlighted over similarNum and finished', () => {
        expect(
            derive({
                sameY: true,
                digitClicked: true,
                sameValue: true,
                areaFinished: true,
            })
        ).toBe(ECellStates.highlighted);
    });
});
