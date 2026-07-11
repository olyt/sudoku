import { solve, countSolutions } from '../../solver';
import { getBlankBoard, copyBoard } from '../../boardHelper';
import { humanSolve } from './humanSolver';

export type { TTechniqueUsed } from './humanSolver';
export { humanSolve } from './humanSolver';

type TTechniqueConfig = { maxRemove: number };

const TECHNIQUE_DIFFICULTIES: Record<keyof IDifficulties, TTechniqueConfig> = {
    easy: { maxRemove: 35 },
    medium: { maxRemove: 50 },
    hard: { maxRemove: 57 },
};

/**
 * @function matchesDifficulty
 * @description Checks whether the techniques used to solve a board match the target difficulty.
 * Easy: non-null result that includes hidden_single but no medium/hard techniques.
 * Medium: non-null result with at least one of naked_pair/hidden_pair/pointing_pairs/box_line, but no X-Wing/Swordfish.
 * Hard: null result (requires beyond-Swordfish) or uses x_wing/swordfish.
 * @param {ReturnType<typeof humanSolve>} techniques - the result of humanSolve
 * @param {keyof IDifficulties} target - the target difficulty level
 * @returns {boolean} - true if the technique profile matches the difficulty
 */
const matchesDifficulty = (
    techniques: ReturnType<typeof humanSolve>,
    target: keyof IDifficulties
): boolean => {
    const mediumTechniques = [
        'naked_pair',
        'hidden_pair',
        'pointing_pairs',
        'box_line',
    ] as const;
    const hardTechniques = ['x_wing', 'swordfish'] as const;

    switch (target) {
        case 'easy':
            return (
                techniques !== null &&
                techniques.includes('hidden_single') &&
                !techniques.some((t) =>
                    [...mediumTechniques, ...hardTechniques].includes(
                        t as never
                    )
                )
            );

        case 'medium':
            return (
                techniques !== null &&
                techniques.some((t) => mediumTechniques.includes(t as never)) &&
                !techniques.some((t) => hardTechniques.includes(t as never))
            );

        default:
            return (
                techniques === null ||
                techniques.some((t) => hardTechniques.includes(t as never))
            );
    }
};

/**
 * @function tryGenerateTechnique
 * @description Attempts one technique-difficulty-controlled board-generation pass.
 * Starts from a fully-solved board, removes cells in random order while maintaining
 * unique solvability (and, for easy/medium, human solvability), then verifies the
 * resulting board matches the target difficulty profile.
 * @param {keyof IDifficulties} difficulty - the difficulty level key
 * @returns {[TBoard, TBoard] | null} - [puzzle, solution] on success, or null on failure
 */
const tryGenerateTechnique = (
    difficulty: keyof IDifficulties
): [TBoard, TBoard] | null => {
    const { maxRemove } = TECHNIQUE_DIFFICULTIES[difficulty];
    const solution = solve(getBlankBoard()) as TBoard;
    const board: TBoard = copyBoard(solution);
    const positions: ICellCoordinates[] = [];

    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            positions.push({ y, x });
        }
    }

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    let removedCount = 0;

    for (const { y, x } of positions) {
        if (removedCount >= maxRemove) {
            break;
        }

        const backup = board[y][x];

        board[y][x] = 0;

        if (countSolutions(board, 2) !== 1) {
            board[y][x] = backup;
            continue;
        }

        if (difficulty !== 'hard' && humanSolve(board) === null) {
            board[y][x] = backup;
            continue;
        }

        removedCount++;
    }

    const techniques = humanSolve(board);

    if (!matchesDifficulty(techniques, difficulty)) {
        return null;
    }

    return [board, solution];
};

/**
 * @function generateTechniqueBoard
 * @description Generates a Sudoku puzzle calibrated to require specific solving techniques
 * matching the given difficulty. Easy puzzles require only naked/hidden singles; medium
 * adds pairs and locked candidates; hard requires X-Wing, Swordfish, or is unsolvable by
 * the implemented techniques. Retries until a matching board is produced.
 * @param {keyof IDifficulties} difficulty - the difficulty level key ('easy' | 'medium' | 'hard')
 * @returns {[TBoard, TBoard]} - a tuple of [technique-calibrated puzzle board, complete solution board]
 */
export const generateTechniqueBoard = (
    difficulty: keyof IDifficulties
): [TBoard, TBoard] => {
    let result = tryGenerateTechnique(difficulty);

    while (!result) {
        result = tryGenerateTechnique(difficulty);
    }

    return result;
};
