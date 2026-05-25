import { vi, describe, it, expect, beforeAll } from 'vitest';
import { generateIsomorphicBoard } from '../generators/isomorphicGenerator';
import { countSolutions } from '../solver';
import { generateBoard } from '../generateBoard';

vi.mock('../generateBoard', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../generateBoard')>();

    return {
        ...actual,
        generateBoard: vi.fn(actual.generateBoard),
    };
});

type TPuzzleResult = { puzzle: TBoard; solution: TBoard };

const difficulties: Array<keyof IDifficulties> = ['easy', 'medium', 'hard'];

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
        const [puzzle, solution] = generateIsomorphicBoard(diff);

        results[diff] = { puzzle, solution };
    }
}, 30_000);

describe('generateIsomorphicBoard', () => {
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

    it.each(difficulties)('%s: solution preserves digit frequency (9 of each digit)', (diff) => {
        const { solution } = results[diff]!;
        const counts = new Array(10).fill(0);

        solution.forEach((row) => row.forEach((v) => counts[v]++));

        for (let d = 1; d <= 9; d++) {
            expect(counts[d]).toBe(9);
        }
    });

    it.each(difficulties)('%s: every non-zero puzzle cell matches the solution', (diff) => {
        const { puzzle, solution } = results[diff]!;

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (puzzle[r][c] !== 0) {
                    expect(puzzle[r][c]).toBe(solution[r][c]);
                }
            }
        }
    });

    it('transposeBoard is called when Math.random returns below 0.5', () => {
        const precomputed = generateBoard('easy');

        vi.mocked(generateBoard).mockReturnValueOnce(precomputed);

        const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.1);
        const [puzzle, solution] = generateIsomorphicBoard('easy');

        expect(isValidSudoku(puzzle)).toBe(true);
        expect(isValidSudoku(solution)).toBe(true);

        randomSpy.mockRestore();
    });
});
