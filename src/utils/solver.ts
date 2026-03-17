type TSolveFn = (board: TBoard) => TBoard | false;
type TCountFn = (board: TBoard, limit?: number) => number;
type TBoardValidator = (board: TBoard) => boolean;

/**
 * @function solved
 * @description Checks whether the board is completely filled (no zero/empty cells)
 * @param {TBoard} board - the Sudoku board to check
 * @returns {boolean} - true if every cell is non-zero
 */
const solved: TBoardValidator = (board: TBoard): boolean => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!board[i][j]) {
                return false;
            }
        }
    }

    return true;
};

/**
 * @function getCandidates
 * @description Returns the valid digit candidates (1–9) for an empty cell.
 * A digit is excluded if it already appears in the same row, column, or 3×3 box.
 * @param {TBoard} board - the Sudoku board
 * @param {number} y - row index of the target cell
 * @param {number} x - column index of the target cell
 * @returns {number[]} - digits 1–9 that are valid placements for the cell
 */
export const getCandidates = (board: TBoard, y: number, x: number): number[] => {
    const used = new Set<number>();

    for (let i = 0; i < 9; i++) {
        if (board[y][i]) {
            used.add(board[y][i]);
        }

        if (board[i][x]) {
            used.add(board[i][x]);
        }
    }

    const boxY = Math.floor(y / 3) * 3;
    const boxX = Math.floor(x / 3) * 3;

    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            if (board[boxY + dy][boxX + dx]) {
                used.add(board[boxY + dy][boxX + dx]);
            }
        }
    }

    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => !used.has(d));
};

/**
 * @function findBestEmpty
 * @description Finds the empty cell with the fewest valid candidates (MRV heuristic).
 * Targeting the most-constrained cell first reduces the search tree significantly compared
 * to a simple top-left scan. Returns null immediately if any empty cell has no valid
 * candidates, signalling a dead end that requires backtracking.
 * @param {TBoard} board - the Sudoku board
 * @returns {[number, number, number[]] | null} - [row, col, candidates] for the most constrained empty cell, or null on a dead end
 */
const findBestEmpty = (board: TBoard): [number, number, number[]] | null => {
    let best: [number, number, number[]] | null = null;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!board[i][j]) {
                const candidates = getCandidates(board, i, j);

                if (candidates.length === 0) {
                    return null;
                }

                if (!best || candidates.length < best[2].length) {
                    best = [i, j, candidates];

                    if (candidates.length === 1) {
                        return best;
                    }
                }
            }
        }
    }

    return best;
};

/**
 * @function solve
 * @description Solves a Sudoku board using backtracking with the MRV (Minimum Remaining
 * Values) heuristic. Picks the most-constrained empty cell at each step to prune the search
 * tree, and shuffles candidates with Fisher-Yates to produce varied random solutions.
 * @param {TBoard} board - a 9x9 Sudoku board (0 represents empty cells)
 * @returns {TBoard | false} - the solved board if a solution exists, or false otherwise
 */
export const solve: TSolveFn = (board: TBoard): TBoard | false => {
    if (solved(board)) {
        return board;
    }

    const best = findBestEmpty(board);

    if (!best) {
        return false;
    }

    const [y, x, candidates] = best;

    for (let i = candidates.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }

    for (const digit of candidates) {
        const newBoard = board.map((row, i) =>
            i === y ? row.map((v, j) => (j === x ? digit : v)) : row
        );
        const result = solve(newBoard);

        if (result) {
            return result;
        }
    }

    return false;
};

/**
 * @function countSolutions
 * @description Counts valid solutions for a board, stopping once `limit` is reached.
 * Uses the MRV heuristic with a fixed candidate order (no randomisation) for determinism.
 * Mutates the board in-place during recursion and restores each cell before returning,
 * avoiding per-call array allocation and reducing GC pressure significantly.
 * Passing limit=2 is the standard uniqueness check: a count of 1 means exactly one solution.
 * @param {TBoard} board - a 9x9 Sudoku board (0 represents empty cells); mutated transiently
 * @param {number} limit - stop counting once this many solutions are found (default: 2)
 * @returns {number} - the number of solutions found, capped at limit
 */
export const countSolutions: TCountFn = (board: TBoard, limit = 2): number => {
    const best = findBestEmpty(board);

    if (!best) {
        return solved(board) ? 1 : 0;
    }

    const [y, x, candidates] = best;
    let count = 0;

    for (const digit of candidates) {
        board[y][x] = digit;
        count += countSolutions(board, limit);
        board[y][x] = 0;

        if (count >= limit) {
            return count;
        }
    }

    return count;
};
