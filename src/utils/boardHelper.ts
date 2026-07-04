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
 * @function getBoxIndex
 * @description Computes the index (0-8) of the 3x3 box containing the given cell coordinates
 * @param {number} y - y coordinate of target cell
 * @param {number} x - x coordinate of target cell
 * @returns {number} - index of the 3x3 box containing the cell
 */
export const getBoxIndex = (y: number, x: number): number =>
    Math.floor(y / 3) * 3 + Math.floor(x / 3);

/**
 * @function checkFinishedBox
 * @description Checks if every cell in the 3x3 box with given index contains a value
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @param {number} boxIndex - index (0-8) of target box
 * @returns {boolean} - if every cell in given box contains a value
 */
const checkFinishedBox = (board: TBoard, boxIndex: number): boolean => {
    const by = Math.floor(boxIndex / 3) * 3;
    const bx = (boxIndex % 3) * 3;

    for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
            if (!board[by + dy][bx + dx]) {
                return false;
            }
        }
    }

    return true;
};

/**
 * @function getFinishedAreas
 * @description Computes which rows, columns and boxes of the board are fully filled with values
 * @param {TBoard} board - two-dimensional array representing sudoku board
 * @returns {TFinishedAreas} - flags for each row, column and box indicating whether it is fully filled
 */
export const getFinishedAreas = (board: TBoard): TFinishedAreas => ({
    rows: board.map((row) => row.every(Boolean)),
    columns: Array.from({ length: 9 }, (_, x) =>
        board.every((row) => Boolean(row[x]))
    ),
    boxes: Array.from({ length: 9 }, (_, boxIndex) =>
        checkFinishedBox(board, boxIndex)
    ),
});

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
