import Boxes from './Boxes';

/** A 9x9 board of all zeros, used as a template for creating blank boards */
const BLANK_BOARD: TBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * @function copyBoard
 * @description Creates a new deep copy of the passed sudoku board
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @returns {TBoard} - new copy of given board
 */
export const copyBoard = (board: TBoard): TBoard =>
    board.map((row) => row.map((num) => num));

/**
 * @function getBoardWithUpdatedValue
 * @description Returns a new board with updated value on given cell coordinates
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @param {ICell} cell - cell object containing value and coordinates
 * @returns {TBoard} - new board with updated value on given cell coordinates
 */
export const getBoardWithUpdatedValue = (
    board: TBoard,
    cell: ICell
): TBoard => {
    return board.map((row, y) => {
        return row.map((currentValue, x) => {
            return cell.y === y && cell.x === x ? cell.value : currentValue;
        });
    });
};

/**
 * @function getBlankBoard
 * @description Returns a blank board
 * @returns {TBoard} - a new blank board
 */
export const getBlankBoard = (): TBoard => {
    return BLANK_BOARD.map((row: number[]) => {
        return row.map((i) => i);
    });
};

/**
 * @function checkFinishedRow
 * @description Checks if every cell in given row contains a value
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @param {number} row - y coordinate of target row
 * @returns {boolean} - if every cell in given row contains a value
 */
const checkFinishedRow = (board: TBoard, row: number): boolean => {
    return board[row].every((num) => !!num);
};

/**
 * @function checkFinishedColumn
 * @description Checks if every cell in given row contains a value
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @param {number} column - x coordinate of target column
 * @returns {boolean} - if every cell in given column contains a value
 */
const checkFinishedColumn = (board: TBoard, column: number): boolean => {
    return board.every((row) => !!row[column]);
};

/**
 * @function checkIfBoardPartFinished
 * @description Checks whether row, column or box containing given coordinates if fully filled with values
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @param {number} y - y coordinate of target row
 * @param {number} x - x coordinate of target column
 * @returns {boolean} - whether row, column or box containing given coordinates if fully filled with values
 */
export const checkIfBoardPartFinished = (
    board: TBoard,
    y: number,
    x: number
): boolean => {
    return (
        checkFinishedRow(board, y) ||
        checkFinishedColumn(board, x) ||
        Boxes.checkFinishedBoxes(board, y, x)
    );
};

/**
 * @function suggestHint
 * @description Returns a cell object with correct value that may be used to hint player
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @param {TBoard} solution - solved board
 * @returns {ICell} - cell object with correct value that may be used to hint player
 */
export const suggestHint = (board: TBoard, solution: TBoard): ICell => {
    const { y } = board.reduce(
        (currentMax, row, idx) => {
            const currentRowFilling = row.reduce((sum, num) => {
                return num ? sum + 1 : sum;
            }, 0);

            return currentMax.filled > currentRowFilling ||
                currentRowFilling === 9
                ? currentMax
                : { filled: currentRowFilling, y: idx };
        },
        { filled: 0, y: -1 }
    );

    const x = board[y].indexOf(0);

    return { y, x, value: solution[y][x] };
};
