import { solve } from './solver';
import { getBlankBoard } from './boardHelper';
import Boxes from './Boxes';

type TCheckFn = (_: number[], __: number) => boolean;
type TGenerateFn = (
    difficulty: keyof IDifficulties
) => [board: TBoard, solution: TBoard];

/**
 * Difficulty presets controlling how many cells are revealed and their distribution.
 * - `mustFill`: total number of pre-filled cells
 * - `inARowMax`: max consecutive filled cells allowed in a row
 * - `inABoxMax`: max filled cells allowed in a single 3x3 box
 * - `numMax` / `numMin`: max/min occurrences of any single digit
 */
export const DIFFICULTIES: IDifficulties = {
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
};

/**
 * @function isRowFilledProperly
 * @description Checks whether a row does not exceed the maximum consecutive filled cells limit.
 * Counts consecutive non-zero cells; resets count when a zero cell is encountered.
 * @param {number[]} row - the row to check
 * @param {number} maxFill - maximum allowed consecutive filled cells
 * @returns {boolean} - true if the row satisfies the constraint
 */
const isRowFilledProperly: TCheckFn = (row, maxFill) => {
    let count = 0;

    for (let i = 0; i < row.length; i++) {
        if (row[i]) {
            count++;
        }

        if (count > maxFill) {
            return false;
        }

        if (row[i] && !row[i + 1]) {
            count = 0;
        }
    }

    return true;
};

/**
 * @function isColumnFilledProperly
 * @description Checks whether a column does not exceed 8 consecutive filled cells
 * @param {TBoard} board - the Sudoku board
 * @param {number} column - the column index to check
 * @returns {boolean} - true if the column satisfies the constraint
 */
const isColumnFilledProperly = (board: TBoard, column: number): boolean => {
    //TODO: Extend difficulty object to cover this value
    const MAX = 8;
    let count = 0;

    for (let row = 0; row < board.length; row++) {
        if (board[row][column]) {
            count++;
        }

        if (count > MAX) {
            return false;
        }

        if (board[row][column] && board[row + 1] && !board[row + 1][column]) {
            return true;
        }
    }

    return true;
};

/**
 * @function getMirroredCoordinates
 * @description Finds all cell coordinates where two rows contain mirrored (swapped) values.
 * Used to ensure the generated puzzle contains at least one mirrored pair,
 * which creates variations in solving.
 * @param {TBoard} board - the solved Sudoku board
 * @returns {ICellCoordinates[]} - array of cell coordinates involved in mirrored pairs
 */
const getMirroredCoordinates = (board: TBoard): ICellCoordinates[] => {
    const swap: { y: number; x: number }[] = [];

    for (let row = 0; row < 8; row++) {
        for (let nextRow = row + 1; nextRow < 9; nextRow++) {
            const columns = getMirroredColumns(board[row], board[nextRow]);

            if (columns.size) {
                columns.forEach((column) => {
                    swap.push({ y: row, x: column });
                    swap.push({ y: nextRow, x: column });
                });
            }
        }
    }

    return swap;
};

/**
 * @function getMirroredColumns
 * @description Finds column indices where values in two rows are swapped (mirrored).
 * E.g., if row[2]=5 and nextRow[7]=5, and row[7]=nextRow[2], both indices are mirrored.
 * @param {number[]} row - first row to compare
 * @param {number[]} nextRow - second row to compare
 * @returns {Set<number>} - set of column indices involved in mirrored pairs
 */
const getMirroredColumns = (row: number[], nextRow: number[]): Set<number> => {
    const mirroredIndices: Set<number> = new Set();

    row.forEach((cellValue, column) => {
        const nextRowIndex = nextRow.indexOf(cellValue);

        if (column !== nextRowIndex && nextRow[column] === row[nextRowIndex]) {
            mirroredIndices.add(column);
            mirroredIndices.add(nextRowIndex);
        }
    });

    return mirroredIndices;
};

/**
 * @function generateBoard
 * @description Generates a Sudoku puzzle with the specified difficulty.
 * 1. Creates a blank board and solves it to produce a full solution.
 * 2. Randomly reveals cells from the solution, respecting difficulty constraints.
 * 3. Ensures at least one mirrored pair of cells is filled.
 * @param {keyof IDifficulties} difficulty - the difficulty level key ('easy' | 'medium' | 'hard')
 * @returns {[TBoard, TBoard]} - a tuple of [puzzle board with blanks, complete solution board]
 */
export const generateBoard: TGenerateFn = (difficulty) => {
    let { mustFill } = DIFFICULTIES[difficulty];
    const { inARowMax, inABoxMax, numMax } = DIFFICULTIES[difficulty];
    const board = getBlankBoard();
    const solution = solve(board) as TBoard;
    const boxes = new Boxes(board, inABoxMax);
    const numbersCounter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const mirroredCoordinates = getMirroredCoordinates(solution);
    let atLeastOneMirroredFilled = !mirroredCoordinates.length;

    while (mustFill) {
        let y: number;
        let x: number;

        if (!atLeastOneMirroredFilled) {
            const { y: swapY, x: swapX } =
                mirroredCoordinates[
                    Math.floor(Math.random() * mirroredCoordinates.length)
                ];

            y = swapY;
            x = swapX;
            atLeastOneMirroredFilled = true;
        } else {
            y = Math.floor(Math.random() * 9);
            x = Math.floor(Math.random() * 9);
        }

        if (!board[y][x] || board[y][x] !== solution[y][x]) {
            let num: number = solution[y][x];

            if (mustFill === 1) {
                for (let i = 1; i < numbersCounter.length; i++) {
                    if (!numbersCounter[i]) {
                        num = i;
                    }
                }
            }

            board[y][x] = num;
            boxes.setValue(num, y, x);
            numbersCounter[num]++;

            if (
                isRowFilledProperly(board[y], inARowMax) &&
                isColumnFilledProperly(board, x) &&
                boxes.checkBox(y, x) &&
                numbersCounter[num] <= numMax
            ) {
                mustFill--;
            } else {
                board[y][x] = 0;
                boxes.resetValue(y, x);
                numbersCounter[num]--;
            }
        }
    }

    return [board, solution];
};
