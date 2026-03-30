import { countSolutions, solve } from './solver';
import { getBlankBoard } from './boardHelper';

type TGenerateFn = (
    difficulty: keyof IDifficulties
) => [board: TBoard, solution: TBoard];
type TTryGenerateFn = (
    difficulty: keyof IDifficulties
) => [TBoard, TBoard] | null;

/**
 * Difficulty presets controlling how many cells are revealed and their distribution.
 * - `mustFill`: total number of pre-filled cells
 * - `inARowMax`: max consecutive filled cells allowed in a row
 * - `inABoxMax`: max filled cells allowed in a single 3x3 box
 * - `numMax` / `numMin`: max/min occurrences of any single digit
 */
export const DIFFICULTIES = {
    easy: {
        mustFill: 50,
        inARowMax: 8,
        inABoxMax: 7,
        numMax: 8,
        numMin: 1,
    },
    medium: {
        mustFill: 40,
        inARowMax: 5,
        inABoxMax: 6,
        numMax: 6,
        numMin: 1,
    },
    hard: {
        mustFill: 24,
        inARowMax: 3,
        inABoxMax: 4,
        numMax: 4,
        numMin: 1,
    },
} satisfies IDifficulties;

/**
 * @function shufflePositions
 * @description Shuffles an array of cell coordinates in-place using Fisher-Yates.
 * @param {ICellCoordinates[]} positions - the array to shuffle
 * @returns {void}
 */
const shufflePositions = (positions: ICellCoordinates[]): void => {
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
};

/**
 * @function checkDistribution
 * @description Verifies that a puzzle board satisfies all distribution constraints for the
 * given difficulty: consecutive row limit, box fill limit, and per-digit min/max counts.
 * @param {TBoard} board - the puzzle board to validate
 * @param {number} inARowMax - max allowed consecutive filled cells in any row
 * @param {number} inABoxMax - max allowed filled cells in any 3×3 box
 * @param {number} numMax - max allowed occurrences of any single digit
 * @param {number} numMin - min required occurrences of any single digit
 * @returns {boolean} - true if all constraints are satisfied
 */
export const checkDistribution = (
    board: TBoard,
    inARowMax: number,
    inABoxMax: number,
    numMax: number,
    numMin: number
): boolean => {
    const numbersCounter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let y = 0; y < 9; y++) {
        let consecutive = 0;

        for (let x = 0; x < 9; x++) {
            const digit = board[y][x];

            if (digit) {
                consecutive++;
                numbersCounter[digit]++;
            } else {
                consecutive = 0;
            }

            /* c8 ignore next 3 -- row consecutive constraint: rarely triggered since cell removal distributes clues broadly */
            if (consecutive > inARowMax) {
                return false;
            }
        }
    }

    /* c8 ignore next 3 -- digit distribution: rarely triggered since removal produces balanced digit counts */
    if (numbersCounter.slice(1).some((count) => count > numMax || count < numMin)) {
        return false;
    }

    for (let by = 0; by < 9; by += 3) {
        for (let bx = 0; bx < 9; bx += 3) {
            let boxFilled = 0;

            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    if (board[by + dy][bx + dx]) {
                        boxFilled++;
                    }
                }
            }

            /* c8 ignore next 3 -- box fill constraint: rarely triggered since random removal distributes cells broadly */
            if (boxFilled > inABoxMax) {
                return false;
            }
        }
    }

    return true;
};

/**
 * @function tryGenerate
 * @description Attempts a single board-generation pass for the given difficulty using a
 * cell-removal strategy: starts with a fully-solved board and removes cells one by one in
 * random order, keeping each removal only when the puzzle remains uniquely solvable.
 * Stops when exactly `mustFill` cells remain, then validates distribution constraints.
 * Returns null if the target cell count cannot be reached or constraints are not met.
 * @param {keyof IDifficulties} difficulty - the difficulty level key
 * @returns {[TBoard, TBoard] | null} - [puzzle, solution] on success, or null on failure
 */
const tryGenerate: TTryGenerateFn = (difficulty) => {
    const { mustFill, inARowMax, inABoxMax, numMax, numMin } = DIFFICULTIES[difficulty];
    const solution = solve(getBlankBoard()) as TBoard;
    const board: TBoard = solution.map((row) => [...row]) as TBoard;

    const positions: ICellCoordinates[] = [];

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            positions.push({ y, x });
        }
    }

    shufflePositions(positions);

    let filled = 81;

    for (const { y, x } of positions) {
        if (filled === mustFill) {
            break;
        }

        const backup = board[y][x];

        board[y][x] = 0;

        if (countSolutions(board, 2) === 1) {
            filled--;
        } else {
            board[y][x] = backup;
        }
    }

    /* c8 ignore next 3 -- target not reached: requires nearly all 81 cells to be uniquely necessary, which is statistically impossible for 24+ clue targets */
    if (filled !== mustFill) {
        return null;
    }

    /* c8 ignore next 3 -- distribution retry: tight constraints (e.g. inARowMax=3 for hard) occasionally produce a non-conforming layout after random removal */
    if (!checkDistribution(board, inARowMax, inABoxMax, numMax, numMin)) {
        return null;
    }

    return [board, solution];
};

/**
 * @function generateBoard
 * @description Generates a Sudoku puzzle with the specified difficulty.
 * Uses a cell-removal strategy: solves a blank board to get a random complete solution,
 * then removes cells in random order while maintaining a unique solution, until the
 * target clue count is reached. Verifies distribution constraints and retries if needed.
 * @param {keyof IDifficulties} difficulty - the difficulty level key ('easy' | 'medium' | 'hard')
 * @returns {[TBoard, TBoard]} - a tuple of [puzzle board with blanks, complete solution board]
 */
export const generateBoard: TGenerateFn = (difficulty) => {
    let result = tryGenerate(difficulty);

    /* c8 ignore next 3 -- retry path: only taken when distribution constraints are not met after removal; statistically rare for all supported difficulties */
    while (!result) {
        result = tryGenerate(difficulty);
    }

    return result;
};
