import { vi, describe, it, expect, beforeAll } from 'vitest';
import { humanSolve, generateTechniqueBoard } from '../generators/technique';
import { countSolutions } from '../solver';
import * as humanSolverModule from '../generators/technique/humanSolver';

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

/**
 * A near-complete board solvable by naked singles only (one empty cell per unit).
 * Row 0 is missing digit 9.
 */
const nakedSinglesBoard: TBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8, 0],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

/**
 * Board where a hidden single is needed in addition to naked singles.
 * Derived from a valid complete grid with strategic removals.
 */
const hiddenSinglesBoard: TBoard = [
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 3],
    [0, 7, 4, 0, 8, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 2],
    [0, 8, 0, 0, 4, 0, 0, 1, 0],
    [6, 0, 0, 5, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 7, 8, 0],
    [5, 0, 0, 0, 0, 9, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0],
];

/**
 * Board where a naked pair is necessary.
 * Row 0: cells at positions 0 and 1 both have only {1,2} as candidates,
 * allowing elimination from the rest of the row.
 */
const nakedPairsBoard: TBoard = [
    [0, 0, 3, 4, 5, 6, 7, 8, 9],
    [4, 0, 7, 2, 0, 3, 6, 0, 5],
    [5, 6, 8, 7, 0, 1, 2, 4, 3],
    [6, 3, 1, 0, 4, 7, 0, 5, 2],
    [7, 4, 5, 0, 2, 8, 0, 6, 1],
    [2, 8, 9, 5, 6, 0, 4, 3, 7],
    [1, 7, 6, 3, 9, 4, 5, 2, 8],
    [8, 5, 2, 6, 7, 0, 3, 1, 4],
    [3, 9, 4, 1, 8, 2, 0, 7, 6],
];

/**
 * Board with a configuration that may require hidden pairs.
 * Uses a well-known puzzle that requires this technique.
 */
const hiddenPairsBoard: TBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 8, 5],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 7, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 1, 0, 0],
    [0, 9, 0, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0, 7, 3],
    [0, 0, 2, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 9],
];

/**
 * Board solvable with pointing pairs (a digit in a box is confined to one row/col).
 */
const pointingPairsBoard: TBoard = [
    [0, 0, 0, 0, 8, 5, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 6, 0, 4, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 4, 0, 0, 0, 0, 0, 6, 0],
    [0, 0, 0, 0, 0, 0, 8, 0, 0],
    [0, 0, 0, 7, 1, 0, 0, 0, 0],
];

/**
 * Board where box-line reduction is needed.
 */
const boxLineBoard: TBoard = [
    [0, 0, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

/**
 * A classic X-Wing board (row-based).
 * Digit 1 appears in exactly columns {0,7} in rows 0 and 5.
 */
const xWingRowBoard: TBoard = [
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0],
];

/**
 * A classic Swordfish board (row-based): digit appears in a matching pattern across 3 rows.
 */
const swordfishRowBoard: TBoard = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
];

describe('humanSolve technique detection', () => {
    it('nakedSinglesBoard: returns [naked_single]', () => {
        const result = humanSolve(nakedSinglesBoard);

        expect(result).toEqual(['naked_single']);
    });

    it('does not mutate the input board', () => {
        const board: TBoard = nakedSinglesBoard.map((row) => [...row]);
        const snapshot = board.map((row) => [...row]);

        humanSolve(board);

        expect(board).toEqual(snapshot);
    });

    it('each technique appears at most once in the result', () => {
        const result = humanSolve(hiddenSinglesBoard);

        if (result !== null) {
            expect(result.length).toBe(new Set(result).size);
        }
    });

    it('hiddenSinglesBoard: result includes hidden_single when solvable', () => {
        const result = humanSolve(hiddenSinglesBoard);

        if (result !== null) {
            expect(result.includes('hidden_single')).toBe(true);
        }
    });

    it('nakedPairsBoard: humanSolve returns non-null or null (does not throw)', () => {
        expect(() => humanSolve(nakedPairsBoard)).not.toThrow();
    });

    it('hiddenPairsBoard: humanSolve returns non-null or null (does not throw)', () => {
        expect(() => humanSolve(hiddenPairsBoard)).not.toThrow();
    });

    it('pointingPairsBoard: humanSolve returns non-null or null (does not throw)', () => {
        expect(() => humanSolve(pointingPairsBoard)).not.toThrow();
    });

    it('boxLineBoard: humanSolve returns non-null or null (does not throw)', () => {
        expect(() => humanSolve(boxLineBoard)).not.toThrow();
    });

    it('xWingRowBoard: humanSolve returns non-null or null (does not throw)', () => {
        expect(() => humanSolve(xWingRowBoard)).not.toThrow();
    });

    it('swordfishRowBoard: humanSolve returns non-null or null (does not throw)', () => {
        expect(() => humanSolve(swordfishRowBoard)).not.toThrow();
    });

    it('fully solved board returns [] (no techniques needed)', () => {
        const solved: TBoard = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9],
            [4, 5, 6, 7, 8, 9, 1, 2, 3],
            [7, 8, 9, 1, 2, 3, 4, 5, 6],
            [2, 3, 4, 5, 6, 7, 8, 9, 1],
            [5, 6, 7, 8, 9, 1, 2, 3, 4],
            [8, 9, 1, 2, 3, 4, 5, 6, 7],
            [3, 4, 5, 6, 7, 8, 9, 1, 2],
            [6, 7, 8, 9, 1, 2, 3, 4, 5],
            [9, 1, 2, 3, 4, 5, 6, 7, 8],
        ];
        const result = humanSolve(solved);

        expect(result).toEqual([]);
    });
});

type TDiffResult = { puzzle: TBoard; solution: TBoard };

const difficultyResults: Partial<Record<keyof IDifficulties, TDiffResult>> = {};
const difficulties: Array<keyof IDifficulties> = ['easy', 'medium', 'hard'];

beforeAll(() => {
    for (const diff of difficulties) {
        const [puzzle, solution] = generateTechniqueBoard(diff);

        difficultyResults[diff] = { puzzle, solution };
    }
}, 30_000);

describe('generateTechniqueBoard', () => {
    it.each(difficulties)('%s: puzzle is a valid Sudoku (no contradictions)', (diff) => {
        const { puzzle } = difficultyResults[diff]!;

        expect(isValidSudoku(puzzle)).toBe(true);
    });

    it.each(difficulties)('%s: solution is fully filled and valid', (diff) => {
        const { solution } = difficultyResults[diff]!;
        const allFilled = solution.every((row) => row.every((v) => v !== 0));

        expect(allFilled).toBe(true);
        expect(isValidSudoku(solution)).toBe(true);
    });

    it.each(difficulties)('%s: puzzle has exactly one solution', (diff) => {
        const { puzzle } = difficultyResults[diff]!;
        const board: TBoard = puzzle.map((row) => [...row]);

        expect(countSolutions(board, 2)).toBe(1);
    });

    it('easy: humanSolve uses only simple techniques', () => {
        const { puzzle } = difficultyResults['easy']!;
        const techniques = humanSolve(puzzle);
        const mediumAndHard = ['naked_pair', 'hidden_pair', 'pointing_pairs', 'box_line', 'x_wing', 'swordfish'];

        expect(techniques).not.toBeNull();
        expect(techniques!.includes('hidden_single')).toBe(true);
        expect(techniques!.some((t) => mediumAndHard.includes(t))).toBe(false);
    });

    it('medium: humanSolve uses at least one medium technique but no X-Wing/Swordfish', () => {
        const { puzzle } = difficultyResults['medium']!;
        const techniques = humanSolve(puzzle);
        const mediumTechniques = ['naked_pair', 'hidden_pair', 'pointing_pairs', 'box_line'];
        const hardTechniques = ['x_wing', 'swordfish'];

        expect(techniques).not.toBeNull();
        expect(techniques!.some((t) => mediumTechniques.includes(t))).toBe(true);
        expect(techniques!.some((t) => hardTechniques.includes(t))).toBe(false);
    });

    it('hard: humanSolve returns null or uses x_wing/swordfish', () => {
        const { puzzle } = difficultyResults['hard']!;
        const techniques = humanSolve(puzzle);
        const hardTechniques = ['x_wing', 'swordfish'];

        const isHard =
            techniques === null ||
            techniques.some((t) => hardTechniques.includes(t));

        expect(isHard).toBe(true);
    });
});

describe('generateTechniqueBoard mock-based coverage', () => {
    it('humanSolve guard: restores cell when board becomes unsolvable by human techniques', () => {
        const realHumanSolve = humanSolverModule.humanSolve;
        const spy = vi.spyOn(humanSolverModule, 'humanSolve')
            .mockReturnValueOnce(null)
            .mockImplementation(realHumanSolve);

        const [puzzle] = generateTechniqueBoard('easy');

        expect(isValidSudoku(puzzle)).toBe(true);
        spy.mockRestore();
    });

    it('retries when matchesDifficulty fails; hard non-null .some() path covered on retry', () => {
        const realHumanSolve = humanSolverModule.humanSolve;
        const spy = vi.spyOn(humanSolverModule, 'humanSolve')
            .mockReturnValueOnce(['naked_single'] as never)
            .mockReturnValueOnce(['x_wing'] as never)
            .mockImplementation(realHumanSolve);

        const [puzzle] = generateTechniqueBoard('hard');

        expect(isValidSudoku(puzzle)).toBe(true);
        spy.mockRestore();
    });
});
