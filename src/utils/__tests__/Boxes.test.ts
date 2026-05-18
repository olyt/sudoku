import { describe, it, expect } from 'vitest';
import Boxes from '../Boxes';

const blankBoard = (): TBoard =>
    Array.from({ length: 9 }, () => Array(9).fill(0));

describe('Boxes constructor', () => {
    it('initialises all box nodes to 0 from a blank board', () => {
        const boxes = new Boxes(blankBoard(), 9);

        // Every box should pass the check with maxFill=9 and all values at 0
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                expect(boxes.checkBox(y, x)).toBe(true);
            }
        }
    });
});

describe('setValue and checkBox', () => {
    it('tracks filled count and enforces maxFill limit', () => {
        const maxFill = 3;
        const boxes = new Boxes(blankBoard(), maxFill);

        // Fill top-left box (rows 0-2, cols 0-2) up to the limit
        boxes.setValue(1, 0, 0);
        boxes.setValue(2, 0, 1);
        boxes.setValue(3, 0, 2);

        expect(boxes.checkBox(0, 0)).toBe(true);

        // One more would exceed maxFill
        boxes.setValue(4, 1, 0);
        expect(boxes.checkBox(0, 0)).toBe(false);
    });
});

describe('resetValue', () => {
    it('count drops and checkBox passes again after reset', () => {
        const maxFill = 2;
        const boxes = new Boxes(blankBoard(), maxFill);

        boxes.setValue(1, 0, 0);
        boxes.setValue(2, 0, 1);
        boxes.setValue(3, 0, 2); // now 3 filled — over limit

        expect(boxes.checkBox(0, 0)).toBe(false);

        boxes.resetValue(0, 2); // back to 2 filled
        expect(boxes.checkBox(0, 0)).toBe(true);
    });
});

describe('Boxes.checkFinishedBoxes (static)', () => {
    it('returns false when any box cell is 0', () => {
        const board = blankBoard();

        board[0][0] = 1; // only one cell filled in the top-left box
        expect(Boxes.checkFinishedBoxes(board, 0, 0)).toBe(false);
    });

    it('returns true when the 3×3 box is fully filled', () => {
        const board = blankBoard();
        const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let v = 0;

        for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 3; dx++) {
                board[dy][dx] = vals[v++];
            }
        }

        expect(Boxes.checkFinishedBoxes(board, 0, 0)).toBe(true);
    });
});
