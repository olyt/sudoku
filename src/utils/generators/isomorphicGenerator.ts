import { generateBoard } from '../generateBoard';

type TTransforms = {
    digitPerm: number[];
    bandMap: number[];
    rowMap: number[];
    stackMap: number[];
    colMap: number[];
    transpose: boolean;
};

/**
 * @function randomPerm
 * @description Generates a random permutation of [0..n-1] using Fisher-Yates.
 * @param {number} n - the length of the permutation
 * @returns {number[]} - shuffled array of indices [0..n-1]
 */
const randomPerm = (n: number): number[] => {
    const perm = Array.from({ length: n }, (_, i) => i);

    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [perm[i], perm[j]] = [perm[j], perm[i]];
    }

    return perm;
};

/**
 * @function relabelDigits
 * @description Permutes the digit labels on the board. Each digit 1-9 is mapped to a
 * new digit via perm, where perm[digit-1]+1 is the new value.
 * @param {TBoard} board - the source board
 * @param {number[]} perm - permutation of [0..8]; new digit = perm[oldDigit-1]+1
 * @returns {TBoard} - new board with relabelled digits
 */
const relabelDigits = (board: TBoard, perm: number[]): TBoard =>
    board.map((row) =>
        row.map((cell) => (cell === 0 ? 0 : perm[cell - 1] + 1))
    );

/**
 * @function swapBands
 * @description Reorders the three horizontal bands (groups of 3 rows) of the board.
 * @param {TBoard} board - the source board
 * @param {number[]} bandMap - permutation of [0,1,2]; bandMap[i] is the source band index for output band i
 * @returns {TBoard} - new board with bands reordered
 */
const swapBands = (board: TBoard, bandMap: number[]): TBoard => {
    const result: TBoard = [];

    for (const b of bandMap) {
        for (let r = 0; r < 3; r++) {
            result.push([...board[b * 3 + r]]);
        }
    }

    return result;
};

/**
 * @function swapRowsWithinBands
 * @description Shuffles rows within each band independently using the provided row map.
 * @param {TBoard} board - the source board
 * @param {number[]} rowMap - length-9 array; rowMap[i] is the source row within band floor(i/3) for output row i
 * @returns {TBoard} - new board with rows within each band reordered
 */
const swapRowsWithinBands = (board: TBoard, rowMap: number[]): TBoard => {
    const result: TBoard = [];

    for (let i = 0; i < 9; i++) {
        const band = Math.floor(i / 3);
        const srcRow = band * 3 + rowMap[i];

        result.push([...board[srcRow]]);
    }

    return result;
};

/**
 * @function swapStacks
 * @description Reorders the three vertical stacks (groups of 3 columns) of the board.
 * @param {TBoard} board - the source board
 * @param {number[]} stackMap - permutation of [0,1,2]; stackMap[i] is the source stack index for output stack i
 * @returns {TBoard} - new board with stacks reordered
 */
const swapStacks = (board: TBoard, stackMap: number[]): TBoard => {
    const result: TBoard = [];

    for (const row of board) {
        const newRow: number[] = [];

        for (let si = 0; si < 3; si++) {
            for (let c = 0; c < 3; c++) {
                newRow.push(row[stackMap[si] * 3 + c]);
            }
        }

        result.push(newRow);
    }

    return result;
};

/**
 * @function swapColsWithinStacks
 * @description Shuffles columns within each stack independently using the provided column map.
 * @param {TBoard} board - the source board
 * @param {number[]} colMap - length-9 array; colMap[i] is the source col within stack floor(i/3) for output col i
 * @returns {TBoard} - new board with columns within each stack reordered
 */
const swapColsWithinStacks = (board: TBoard, colMap: number[]): TBoard =>
    board.map((row) => {
        const newRow: number[] = [];

        for (let i = 0; i < 9; i++) {
            const stack = Math.floor(i / 3);
            const srcCol = stack * 3 + colMap[i];

            newRow.push(row[srcCol]);
        }

        return newRow;
    });

/**
 * @function transposeBoard
 * @description Transposes the board (swaps rows and columns).
 * @param {TBoard} board - the source board
 * @returns {TBoard} - new transposed board
 */
const transposeBoard = (board: TBoard): TBoard =>
    board.map((_, y) => board.map((row) => row[y]));

/**
 * @function applyTransforms
 * @description Applies all six isomorphic transforms to a board in a fixed order:
 * relabel digits, swap bands, shuffle rows within bands, swap stacks, shuffle cols within stacks,
 * and optionally transpose.
 * @param {TBoard} board - the source board
 * @param {TTransforms} transforms - the set of transforms to apply
 * @returns {TBoard} - new board with all transforms applied
 */
const applyTransforms = (board: TBoard, transforms: TTransforms): TBoard => {
    let result = relabelDigits(board, transforms.digitPerm);

    result = swapBands(result, transforms.bandMap);
    result = swapRowsWithinBands(result, transforms.rowMap);
    result = swapStacks(result, transforms.stackMap);
    result = swapColsWithinStacks(result, transforms.colMap);

    if (transforms.transpose) {
        result = transposeBoard(result);
    }

    return result;
};

/**
 * @function generateIsomorphicBoard
 * @description Generates a Sudoku puzzle by applying random isomorphic transforms to a
 * standard generated board. The transforms (digit relabelling, band/stack reordering,
 * row/col shuffles within bands/stacks, optional transpose) preserve validity and uniqueness
 * while producing a visually distinct puzzle.
 * @param {keyof IDifficulties} difficulty - the difficulty level key ('easy' | 'medium' | 'hard')
 * @returns {[TBoard, TBoard]} - a tuple of [transformed puzzle board, transformed solution board]
 */
export const generateIsomorphicBoard = (
    difficulty: keyof IDifficulties
): [TBoard, TBoard] => {
    const [puzzle, solution] = generateBoard(difficulty);
    const bandPerm = randomPerm(3);
    const stackPerm = randomPerm(3);
    const rowMap: number[] = [];
    const colMap: number[] = [];

    for (let b = 0; b < 3; b++) {
        const rPerm = randomPerm(3);
        const cPerm = randomPerm(3);

        for (let r = 0; r < 3; r++) {
            rowMap.push(rPerm[r]);
            colMap.push(cPerm[r]);
        }
    }

    const transforms: TTransforms = {
        digitPerm: randomPerm(9),
        bandMap: bandPerm,
        rowMap,
        stackMap: stackPerm,
        colMap,
        transpose: Math.random() < 0.5,
    };

    return [
        applyTransforms(puzzle, transforms),
        applyTransforms(solution, transforms),
    ];
};
