import { describe, it, expect, beforeAll } from 'vitest';
import { DIFFICULTIES, generateBoard } from '../generateBoard';
import { countSolutions } from '../solver';

const isValidSudoku = (board: TBoard): boolean => {
    for (let i = 0; i < 9; i++) {
        const row = board[i].filter((v) => v > 0);
        const col = board.map((r) => r[i]).filter((v) => v > 0);

        if (new Set(row).size !== row.length) return false;
        if (new Set(col).size !== col.length) return false;
    }

    for (let by = 0; by < 9; by += 3) {
        for (let bx = 0; bx < 9; bx += 3) {
            const box: number[] = [];

            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    const v = board[by + dy][bx + dx];

                    if (v > 0) box.push(v);
                }
            }

            if (new Set(box).size !== box.length) return false;
        }
    }

    return true;
};

const countFilled = (board: TBoard): number =>
    board.reduce((sum, row) => sum + row.filter((v) => v > 0).length, 0);

const maxConsecutiveInRow = (row: number[]): number => {
    let max = 0;
    let count = 0;

    for (const v of row) {
        if (v) {
            count++;
            max = Math.max(max, count);
        } else {
            count = 0;
        }
    }

    return max;
};

const filledInBox = (
    board: TBoard,
    byStart: number,
    bxStart: number
): number => {
    let count = 0;

    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            if (board[byStart + dy][bxStart + dx]) count++;
        }
    }

    return count;
};

describe('DIFFICULTIES', () => {
    it('has exactly 3 keys', () => {
        expect(Object.keys(DIFFICULTIES)).toHaveLength(3);
    });

    it('each difficulty has all 5 constraint fields', () => {
        const fields = [
            'mustFill',
            'inARowMax',
            'inABoxMax',
            'numMax',
            'numMin',
        ];

        for (const key of Object.keys(
            DIFFICULTIES
        ) as (keyof IDifficulties)[]) {
            for (const field of fields) {
                expect(DIFFICULTIES[key]).toHaveProperty(field);
            }
        }
    });
});

describe('generateBoard', () => {
    for (const diffKey of Object.keys(
        DIFFICULTIES
    ) as (keyof IDifficulties)[]) {
        describe(`difficulty: ${diffKey}`, () => {
            const diff = DIFFICULTIES[diffKey];
            let board: TBoard;
            let solution: TBoard;

            // Generate once per difficulty block; hard may take several seconds
            beforeAll(() => {
                [board, solution] = generateBoard(diffKey);
            }, 30_000);

            it('board has exactly mustFill pre-filled cells', () => {
                expect(countFilled(board)).toBe(diff.mustFill);
            });

            it('every filled board cell is a digit 1-9 and the board has no row/col/box contradictions', () => {
                for (let y = 0; y < 9; y++) {
                    for (let x = 0; x < 9; x++) {
                        if (board[y][x]) {
                            expect(board[y][x]).toBeGreaterThanOrEqual(1);
                            expect(board[y][x]).toBeLessThanOrEqual(9);
                        }
                    }
                }

                expect(isValidSudoku(board)).toBe(true);
            });

            it('solution is fully filled (no zeros)', () => {
                for (let y = 0; y < 9; y++) {
                    for (let x = 0; x < 9; x++) {
                        expect(solution[y][x]).toBeGreaterThan(0);
                    }
                }
            });

            it('solution is a valid Sudoku', () => {
                expect(isValidSudoku(solution)).toBe(true);
            });

            it('no row exceeds inARowMax consecutive filled cells', () => {
                for (let y = 0; y < 9; y++) {
                    expect(maxConsecutiveInRow(board[y])).toBeLessThanOrEqual(
                        diff.inARowMax
                    );
                }
            });

            it('no box exceeds inABoxMax filled cells', () => {
                for (let by = 0; by < 9; by += 3) {
                    for (let bx = 0; bx < 9; bx += 3) {
                        expect(filledInBox(board, by, bx)).toBeLessThanOrEqual(
                            diff.inABoxMax
                        );
                    }
                }
            });

            it('no digit appears more than numMax times', () => {
                const counter = Array(10).fill(0);

                for (let y = 0; y < 9; y++) {
                    for (let x = 0; x < 9; x++) {
                        if (board[y][x]) counter[board[y][x]]++;
                    }
                }

                for (let d = 1; d <= 9; d++) {
                    expect(counter[d]).toBeLessThanOrEqual(diff.numMax);
                }
            });

            it('puzzle has exactly one solution', () => {
                expect(countSolutions(board, 2)).toBe(1);
            });
        });
    }
});
