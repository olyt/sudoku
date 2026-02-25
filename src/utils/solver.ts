/** Relative coordinates of all 9 cells within a 3x3 box */
const BOX_COORDINATES = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
];

type TSolution = (boards: TBoards) => TBoard | false;
type TBoardValidator = (board: TBoard) => boolean;
type TSolveFn = (board: TBoard) => TBoard | false;
type TBoardsGenerator = (board: TBoard) => TBoards;
type TFindSquareFn = (board: TBoard) => number[] | void;
type TIsValidBoardsFn = (boards: TBoards) => TBoards;

/**
 * @function searchForSolution
 * @description Recursively searches through a list of candidate boards for a valid solution.
 * Picks the first board, attempts to solve it; if it fails, tries the next.
 * @param {TBoards} validBoards - array of partially filled boards to try solving
 * @returns {TBoard | false} - the solved board, or false if no solution exists among candidates
 */
const searchForSolution: TSolution = (validBoards) => {
    for (let i = 0; i < validBoards.length; i++) {
        const tryPath = solve(validBoards[i]);

        if (tryPath) {
            return tryPath;
        }
    }

    return false;
};

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
 * @function nextBoards
 * @description Generates 9 candidate boards by filling the first empty cell with each digit 1-9 in random order.
 * Uses a Fisher-Yates shuffle to guarantee all 9 digits are tried exactly once while producing varied solutions.
 * @param {TBoard} board - the current board state
 * @returns {TBoards} - array of 9 new boards, each with a unique digit placed in the first empty cell
 */
const nextBoards: TBoardsGenerator = (board: TBoard): TBoards => {
    const res = [];
    const firstEmpty = findEmptySquare(board);

    if (firstEmpty) {
        const [y, x] = firstEmpty;
        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [digits[i], digits[j]] = [digits[j], digits[i]];
        }

        for (let i = 0; i < 9; i++) {
            const newBoard = [...board];
            const row = [...newBoard[y]];

            row[x] = digits[i];
            newBoard[y] = row;
            res.push(newBoard);
        }
    }

    return res;
};

/**
 * @function findEmptySquare
 * @description Finds the first empty (zero-valued) cell on the board, scanning top-to-bottom, left-to-right
 * @param {TBoard} board - the Sudoku board to search
 * @returns {Array<number> | undefined} - [row, col] coordinates of the first empty cell, or undefined if board is full
 */
const findEmptySquare: TFindSquareFn = (
    board: TBoard
): Array<number> | undefined => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!board[i][j]) {
                return [i, j];
            }
        }
    }
};

/**
 * @function isValidRow
 * @description Validates that no row contains duplicate non-zero values
 * @param {TBoard} board - the Sudoku board to validate
 * @returns {boolean} - true if all rows are valid
 */
const isValidRow: TBoardValidator = (board: TBoard): boolean => {
    for (let i = 0; i < 9; i++) {
        const seen = new Set<number>();

        for (let j = 0; j < 9; j++) {
            if (board[i][j]) {
                if (seen.has(board[i][j])) {
                    return false;
                }

                seen.add(board[i][j]);
            }
        }
    }

    return true;
};

/**
 * @function isValidColumn
 * @description Validates that no column contains duplicate non-zero values
 * @param {TBoard} board - the Sudoku board to validate
 * @returns {boolean} - true if all columns are valid
 */
const isValidColumn: TBoardValidator = (board: TBoard): boolean => {
    for (let i = 0; i < 9; i++) {
        const seen = new Set<number>();

        for (let j = 0; j < 9; j++) {
            if (board[j][i]) {
                if (seen.has(board[j][i])) {
                    return false;
                }

                seen.add(board[j][i]);
            }
        }
    }

    return true;
};

/**
 * @function isValidBoxes
 * @description Validates that no 3x3 box contains duplicate non-zero values
 * @param {TBoard} board - the Sudoku board to validate
 * @returns {boolean} - true if all 9 boxes are valid
 */
const isValidBoxes: TBoardValidator = (board: TBoard): boolean => {
    for (let y = 0; y < 9; y += 3) {
        for (let x = 0; x < 9; x += 3) {
            const seen = new Set<number>();

            for (let i = 0; i < 9; i++) {
                const cellY = BOX_COORDINATES[i][0] + y;
                const cellX = BOX_COORDINATES[i][1] + x;
                const value = board[cellY][cellX];

                if (value) {
                    if (seen.has(value)) {
                        return false;
                    }

                    seen.add(value);
                }
            }
        }
    }

    return true;
};

/**
 * @function validBoard
 * @description Validates that a board satisfies all Sudoku constraints (rows, columns, and boxes)
 * @param {TBoard} board - the Sudoku board to validate
 * @returns {boolean} - true if the board is valid
 */
const validBoard: TBoardValidator = (board: TBoard): boolean => {
    return isValidRow(board) && isValidColumn(board) && isValidBoxes(board);
};

/**
 * @function keepOnlyValid
 * @description Filters an array of boards, keeping only those that satisfy all Sudoku constraints
 * @param {TBoards} boards - array of candidate boards
 * @returns {TBoards} - array of valid boards
 */
const keepOnlyValid: TIsValidBoardsFn = (boards: TBoards): TBoards => {
    return boards.filter((board: TBoard) => {
        return validBoard(board);
    });
};

/**
 * @function solve
 * @description Solves a Sudoku board using backtracking with randomized candidate generation.
 * Recursively fills empty cells and backtracks when constraints are violated.
 * @param {TBoard} board - a 9x9 Sudoku board (0 represents empty cells)
 * @returns {TBoard | false} - the solved board if a solution exists, or false otherwise
 */
export const solve: TSolveFn = (board: TBoard): TBoard | false => {
    if (solved(board)) {
        return board;
    }

    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);

    return searchForSolution(validBoards);
};
