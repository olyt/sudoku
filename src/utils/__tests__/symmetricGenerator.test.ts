import { vi, describe, it, expect, beforeAll } from 'vitest';
import { generateSymmetricBoard } from '../generators/symmetricGenerator';
import * as solverModule from '../solver';
import * as generateBoardModule from '../generateBoard';

const { countSolutions } = solverModule;

type TPuzzleResult = { puzzle: TBoard; solution: TBoard };

const difficulties: TDifficultyKey[] = ['easy', 'medium', 'hard'];

const results: Partial<Record<keyof IDifficulties, TPuzzleResult>> = {};

/**
 * Check that every row, column, and box in the board contains no repeated non-zero digit.
 */
const isValidSudoku = (board: TBoard): boolean => {
    for (let i = 0; i < 9; i++) {
        const rowDigits = board[i].filter((v) => v !== 0);
        const colDigits = board.map((row) => row[i]).filter((v) => v !== 0);

        if (new Set(rowDigits).size !== rowDigits.length) {
            return false;
        }

        if (new Set(colDigits).size !== colDigits.length) {
            return false;
        }
    }

    for (let by = 0; by < 9; by += 3) {
        for (let bx = 0; bx < 9; bx += 3) {
            const boxDigits: number[] = [];

            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    const v = board[by + dy][bx + dx];

                    if (v !== 0) {
                        boxDigits.push(v);
                    }
                }
            }

            if (new Set(boxDigits).size !== boxDigits.length) {
                return false;
            }
        }
    }

    return true;
};

beforeAll(() => {
    for (const diff of difficulties) {
        const [puzzle, solution] = generateSymmetricBoard(diff);

        results[diff] = { puzzle, solution };
    }
}, 30_000);

describe('generateSymmetricBoard', () => {
    it.each(difficulties)('%s: puzzle is a valid Sudoku (no contradictions)', (diff) => {
        const { puzzle } = results[diff]!;

        expect(isValidSudoku(puzzle)).toBe(true);
    });

    it.each(difficulties)('%s: solution is fully filled and valid', (diff) => {
        const { solution } = results[diff]!;
        const allFilled = solution.every((row) => row.every((v) => v !== 0));

        expect(allFilled).toBe(true);
        expect(isValidSudoku(solution)).toBe(true);
    });

    it.each(difficulties)('%s: puzzle has exactly one solution', (diff) => {
        const { puzzle } = results[diff]!;
        const board: TBoard = puzzle.map((row) => [...row]);

        expect(countSolutions(board, 2)).toBe(1);
    });

    it.each(difficulties)('%s: every zero cell has its 180-degree mirror also zero (or is center)', (diff) => {
        const { puzzle } = results[diff]!;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (puzzle[r][c] === 0) {
                    const mr = 8 - r;
                    const mc = 8 - c;
                    const isCenter = r === 4 && c === 4;

                    if (!isCenter) {
                        expect(puzzle[mr][mc]).toBe(0);
                    }
                }
            }
        }
    });

    it('retries when checkDistribution fails on first attempt', () => {
        const spy = vi.spyOn(generateBoardModule, 'checkDistribution').mockReturnValueOnce(false);
        const [puzzle] = generateSymmetricBoard('easy');

        expect(isValidSudoku(puzzle)).toBe(true);
        spy.mockRestore();
    });

    it('tryCenterRemoval: restores center when countSolutions rejects removal', () => {
        // Force filledCount === mustFill+1 === 51 for easy:
        // allow only 2-element pair removals while zeros stays ≤30 and even.
        // The center pair (1 cell) makes zeros odd → spy returns 2 → never removed.
        // After 15 pairs (30 zeros) further removals are blocked → filledCount=51.
        // tryCenterRemoval then sets board[4][4]=0 (zeros=31, odd) → spy returns 2 →
        // center is restored → lines 56, 58, 65, 67 all covered.
        const countSpy = vi.spyOn(solverModule, 'countSolutions').mockImplementation((board) => {
            const zeros = (board as number[][]).flat().filter((v) => v === 0).length;

            return zeros <= 30 && zeros % 2 === 0 ? 1 : 2;
        });
        const distSpy = vi.spyOn(generateBoardModule, 'checkDistribution').mockReturnValue(true);
        const [, solution] = generateSymmetricBoard('easy');

        expect(isValidSudoku(solution)).toBe(true);
        countSpy.mockRestore();
        distSpy.mockRestore();
    });
});
