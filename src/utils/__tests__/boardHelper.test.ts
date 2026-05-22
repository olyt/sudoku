import { describe, it, expect } from 'vitest';
import {
    copyBoard,
    getBlankBoard,
    getBoardWithUpdatedValue,
    checkIfBoardPartFinished,
    suggestHint,
} from '../boardHelper';

const makeBoard = (fill: number): TBoard =>
    Array.from({ length: 9 }, () => Array(9).fill(fill));

const blankBoard = (): TBoard => makeBoard(0);

describe('copyBoard', () => {
    it('returns a deep copy — mutations do not affect original', () => {
        const original: TBoard = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            ...Array(8).fill(Array(9).fill(0)),
        ];
        const copy = copyBoard(original);

        copy[0][0] = 99;
        expect(original[0][0]).toBe(1);
    });
});

describe('getBlankBoard', () => {
    it('returns a 9×9 board of all zeros', () => {
        const board = getBlankBoard();

        expect(board).toHaveLength(9);
        board.forEach((row) => {
            expect(row).toHaveLength(9);
            row.forEach((cell) => expect(cell).toBe(0));
        });
    });

    it('each call returns a new instance', () => {
        const a = getBlankBoard();
        const b = getBlankBoard();

        expect(a).not.toBe(b);
        a[0][0] = 5;
        expect(b[0][0]).toBe(0);
    });
});

describe('getBoardWithUpdatedValue', () => {
    it('updates the correct cell and leaves original unchanged', () => {
        const board = blankBoard();
        const cell: ICell = { y: 3, x: 5, value: 7 };
        const updated = getBoardWithUpdatedValue(board, cell);

        expect(updated[3][5]).toBe(7);
        expect(board[3][5]).toBe(0);
    });

    it('only changes the targeted cell', () => {
        const board = blankBoard();
        const updated = getBoardWithUpdatedValue(board, { y: 0, x: 0, value: 1 });

        let nonZero = 0;

        updated.forEach((row) => row.forEach((v) => { if (v) nonZero++; }));
        expect(nonZero).toBe(1);
    });
});

describe('checkIfBoardPartFinished', () => {
    it('returns true when the row is fully filled', () => {
        const board = blankBoard();

        for (let x = 0; x < 9; x++) {
            board[2][x] = x + 1;
        }

        expect(checkIfBoardPartFinished(board, 2, 0)).toBe(true);
    });

    it('returns true when the column is fully filled', () => {
        const board = blankBoard();

        for (let y = 0; y < 9; y++) {
            board[y][4] = y + 1;
        }

        expect(checkIfBoardPartFinished(board, 0, 4)).toBe(true);
    });

    it('returns true when the box is fully filled', () => {
        const board = blankBoard();
        const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let v = 0;

        for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 3; dx++) {
                board[dy][dx] = vals[v++];
            }
        }

        expect(checkIfBoardPartFinished(board, 0, 0)).toBe(true);
    });

    it('returns false when row, column, and box are all incomplete', () => {
        const board = blankBoard();

        board[0][0] = 1;
        expect(checkIfBoardPartFinished(board, 0, 0)).toBe(false);
    });
});

describe('suggestHint', () => {
    it('returns a zero cell in the least-filled row matching the solution', () => {
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
        const board = copyBoard(solution);

        // Row 4 has 8 filled; leave one cell empty so it's the least filled
        board[4][3] = 0;

        const hint = suggestHint(board, solution);

        expect(hint.y).toBe(4);
        expect(hint.x).toBe(3);
        expect(hint.value).toBe(solution[4][3]);
    });
});
