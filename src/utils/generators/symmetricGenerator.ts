import { solve, countSolutions } from '../solver';
import { getBlankBoard } from '../boardHelper';
import { DIFFICULTIES, checkDistribution } from '../generateBoard';

/**
 * @function buildPairs
 * @description Builds 180-degree rotationally symmetric cell pairs for the board.
 * Produces 40 two-element pairs and 1 one-element group for the center cell (4,4).
 * @returns {Array<ICellCoordinates[]>} - array of symmetric cell groups
 */
const buildPairs = (): Array<ICellCoordinates[]> => {
    const pairs: Array<ICellCoordinates[]> = [];

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            if (y === 4 && x === 4) {
                pairs.push([{ y: 4, x: 4 }]);
            } else if (y * 9 + x < (8 - y) * 9 + (8 - x)) {
                pairs.push([{ y, x }, { y: 8 - y, x: 8 - x }]);
            }
        }
    }

    return pairs;
};

/**
 * @function shuffleArray
 * @description Fisher-Yates in-place shuffle of a generic array.
 * @template T
 * @param {T[]} arr - the array to shuffle in-place
 * @returns {void}
 */
const shuffleArray = <T>(arr: T[]): void => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};

/**
 * @function tryCenterRemoval
 * @description If filledCount is exactly one above the target, attempts to remove the
 * center cell (4,4) when it is filled and its removal preserves unique solvability.
 * @param {TBoard} board - the board being generated (mutated in place if removal succeeds)
 * @param {number} filledCount - current number of filled cells
 * @param {number} mustFill - target number of filled cells
 * @returns {number} - updated filledCount after the attempt
 */
const tryCenterRemoval = (board: TBoard, filledCount: number, mustFill: number): number => {
    if (filledCount !== mustFill + 1 || board[4][4] === 0) {
        return filledCount;
    }

    const center = board[4][4];

    board[4][4] = 0;

    /* c8 ignore next 3 -- succeeds only when the resulting puzzle remains uniquely solvable */
    if (countSolutions(board, 2) === 1) {
        return filledCount - 1;
    }

    board[4][4] = center;

    return filledCount;
};

/**
 * @function tryGenerateSymmetric
 * @description Attempts one symmetric board-generation pass.
 * Starts from a fully-solved board and removes symmetric pairs of cells,
 * keeping each removal only when the puzzle remains uniquely solvable.
 * Accepts the result when the filled count is within ±1 of mustFill and
 * distribution constraints pass.
 * @param {keyof IDifficulties} difficulty - the difficulty level key
 * @returns {[TBoard, TBoard] | null} - [puzzle, solution] on success, or null on failure
 */
const tryGenerateSymmetric = (
    difficulty: keyof IDifficulties
): [TBoard, TBoard] | null => {
    const { mustFill, inARowMax, inABoxMax, numMax, numMin } = DIFFICULTIES[difficulty];
    const solution = solve(getBlankBoard()) as TBoard;
    const board: TBoard = solution.map((row) => [...row]) as TBoard;
    const pairs = buildPairs();

    shuffleArray(pairs);

    let filledCount = 81;

    for (const pair of pairs) {
        const pairSize = pair.length;

        if (filledCount - pairSize < mustFill) {
            continue;
        }

        const backups = pair.map(({ y, x }) => board[y][x]);

        for (const { y, x } of pair) {
            board[y][x] = 0;
        }

        if (countSolutions(board, 2) === 1) {
            filledCount -= pairSize;
        } else {
            pair.forEach(({ y, x }, i) => {
                board[y][x] = backups[i];
            });
        }
    }

    filledCount = tryCenterRemoval(board, filledCount, mustFill);

    const inRange = filledCount >= mustFill - 1 && filledCount <= mustFill + 1;

    if (!inRange || !checkDistribution(board, inARowMax, inABoxMax, numMax, numMin)) {
        return null;
    }

    return [board, solution];
};

/**
 * @function generateSymmetricBoard
 * @description Generates a Sudoku puzzle with 180-degree rotational symmetry.
 * Symmetric pairs of cells are either both revealed or both hidden,
 * producing an aesthetically balanced puzzle. Retries until constraints are met.
 * @param {keyof IDifficulties} difficulty - the difficulty level key ('easy' | 'medium' | 'hard')
 * @returns {[TBoard, TBoard]} - a tuple of [symmetric puzzle board, complete solution board]
 */
export const generateSymmetricBoard = (
    difficulty: keyof IDifficulties
): [TBoard, TBoard] => {
    let result = tryGenerateSymmetric(difficulty);

    while (!result) {
        result = tryGenerateSymmetric(difficulty);
    }

    return result;
};
