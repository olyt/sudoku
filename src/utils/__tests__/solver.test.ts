import { describe, it, expect } from 'vitest';
import { solve, countSolutions } from '../solver';

const blankBoard: TBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const solvedBoard: TBoard = [
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

const almostSolvedBoard: TBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 0],
];

const unsolvableBoard: TBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const isValidSudoku = (board: TBoard): boolean => {
    for (let i = 0; i < 9; i++) {
        const row = new Set(board[i]);
        const col = new Set(board.map((r) => r[i]));

        if (row.size !== 9 || col.size !== 9) {
            return false;
        }
    }

    for (let by = 0; by < 9; by += 3) {
        for (let bx = 0; bx < 9; bx += 3) {
            const box = new Set<number>();

            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    box.add(board[by + dy][bx + dx]);
                }
            }

            if (box.size !== 9) {
                return false;
            }
        }
    }

    return true;
};

describe('solve', () => {
    it('solves a blank board and returns a fully filled valid board', () => {
        const result = solve(blankBoard);

        expect(result).not.toBe(false);

        const board = result as TBoard;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                expect(board[i][j]).toBeGreaterThan(0);
            }
        }

        expect(isValidSudoku(board)).toBe(true);
    });

    it('fills the last empty cell of an almost-solved board', () => {
        const result = solve(almostSolvedBoard);

        expect(result).not.toBe(false);

        const board = result as TBoard;

        expect(board[8][8]).toBe(9);
        expect(isValidSudoku(board)).toBe(true);
    });

    it('returns the same board when already solved (early-exit path)', () => {
        const result = solve(solvedBoard);

        expect(result).toBe(solvedBoard);
    });

    it('returns false for an unsolvable board', () => {
        const result = solve(unsolvableBoard);

        expect(result).toBe(false);
    });
});

describe('countSolutions', () => {
    it('returns 1 for a board with exactly one solution', () => {
        expect(countSolutions(almostSolvedBoard)).toBe(1);
    });

    it('returns 0 for an unsolvable board', () => {
        expect(countSolutions(unsolvableBoard)).toBe(0);
    });

    it('returns 1 for an already-solved board', () => {
        expect(countSolutions(solvedBoard)).toBe(1);
    });

    it('caps at the given limit for a board with many solutions', () => {
        expect(countSolutions(blankBoard, 2)).toBe(2);
    });

    it('uses 2 as the default limit', () => {
        expect(countSolutions(blankBoard)).toBe(2);
    });
});
