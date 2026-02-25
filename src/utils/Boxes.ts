/** Represents a single cell within a box, storing its coordinates and value */
type TBoxNode = {
    x: number;
    y: number;
    value: number;
};

/** Defines the row and column indices that belong to a 3x3 box */
type TBoxCoordinates = {
    y: number[];
    x: number[];
};

/**
 * @description Manages the nine 3x3 boxes of a Sudoku board.
 * Used during board generation to track how many cells are filled per box
 * and enforce maximum fill constraints per difficulty level.
 */
class Boxes {
    private readonly _boxes: TBoxNode[][];
    private readonly _maxFill: number;
    private static readonly _boxPointer: TBoxCoordinates[] = [
        { y: [0, 1, 2], x: [0, 1, 2] },
        { y: [0, 1, 2], x: [3, 4, 5] },
        { y: [0, 1, 2], x: [6, 7, 8] },
        { y: [3, 4, 5], x: [0, 1, 2] },
        { y: [3, 4, 5], x: [3, 4, 5] },
        { y: [3, 4, 5], x: [6, 7, 8] },
        { y: [6, 7, 8], x: [0, 1, 2] },
        { y: [6, 7, 8], x: [3, 4, 5] },
        { y: [6, 7, 8], x: [6, 7, 8] },
    ];

    /**
     * @function getBoxIndex
     * @description Computes the box index (0-8) from cell coordinates in O(1)
     * @param {number} y - row index of the cell
     * @param {number} x - column index of the cell
     * @returns {number} - the index of the 3x3 box containing the cell
     */
    private static getBoxIndex(y: number, x: number): number {
        return Math.floor(y / 3) * 3 + Math.floor(x / 3);
    }

    /**
     * @function getNodeIndex
     * @description Computes the node index (0-8) within a box from cell coordinates in O(1)
     * @param {number} y - row index of the cell
     * @param {number} x - column index of the cell
     * @returns {number} - the index of the node within its box
     */
    private static getNodeIndex(y: number, x: number): number {
        return (y % 3) * 3 + (x % 3);
    }

    /**
     * @function findCurrentBoxForCell
     * @description Finds the box coordinates that contain the given cell position
     * @param {number} y - row index of the cell
     * @param {number} x - column index of the cell
     * @returns {TBoxCoordinates} - the box coordinate mapping containing the cell
     */
    private static findCurrentBoxForCell(
        y: number,
        x: number
    ): TBoxCoordinates {
        return this._boxPointer.find(({ y: boxYs, x: boxXs }) => {
            return !!~boxYs.indexOf(y) && !!~boxXs.indexOf(x);
        }) as TBoxCoordinates;
    }

    /**
     * @function checkFinishedBoxes
     * @description Checks whether the 3x3 box containing the given cell is fully filled
     * @param {TBoard} board - the current Sudoku board
     * @param {number} y - row index of a cell in the target box
     * @param {number} x - column index of a cell in the target box
     * @returns {boolean} - true if every cell in the box has a non-zero value
     */
    public static checkFinishedBoxes(
        board: TBoard,
        y: number,
        x: number
    ): boolean {
        const { y: boxYs, x: boxXs } = this.findCurrentBoxForCell(y, x);

        for (const boxY of boxYs) {
            for (const boxX of boxXs) {
                if (!board[boxY][boxX]) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @description Creates a new Boxes instance from the given board
     * @param {TBoard} board - the initial Sudoku board
     * @param {number} maxFill - maximum number of filled cells allowed per box
     */
    constructor(board: TBoard, maxFill: number) {
        this._maxFill = maxFill;
        this._boxes = this.generateInitialBoxes(board);
    }

    /**
     * @function setValue
     * @description Sets a value in the box node at the given coordinates
     * @param {number} value - the digit to set
     * @param {number} y - row index of the cell
     * @param {number} x - column index of the cell
     */
    public setValue(value: number, y: number, x: number): void {
        this._boxes[Boxes.getBoxIndex(y, x)][Boxes.getNodeIndex(y, x)].value =
            value;
    }

    /**
     * @function resetValue
     * @description Resets a cell's value back to 0 (used when a placement is rejected)
     * @param {number} y - row index of the cell
     * @param {number} x - column index of the cell
     */
    public resetValue(y: number, x: number): void {
        this._boxes[Boxes.getBoxIndex(y, x)][Boxes.getNodeIndex(y, x)].value =
            0;
    }

    /**
     * @function checkBox
     * @description Checks whether the box containing the given cell satisfies the fill constraint
     * @param {number} y - row index of a cell in the target box
     * @param {number} x - column index of a cell in the target box
     * @returns {boolean} - true if the number of filled cells is within the limit
     */
    public checkBox(y: number, x: number): boolean {
        const box = this._boxes[Boxes.getBoxIndex(y, x)];
        let count = 0;

        for (let i = 0; i < box.length; i++) {
            if (box[i].value) {
                count++;
            }

            if (count > this._maxFill) {
                return false;
            }
        }

        return true;
    }

    /**
     * @function generateInitialBoxes
     * @description Creates the initial box data structure from the board.
     * Maps each of the 9 boxes to an array of TBoxNode objects.
     * @param {TBoard} board - the Sudoku board to initialize from
     * @returns {TBoxNode[][]} - a 2D array where each sub-array represents a 3x3 box
     */
    private generateInitialBoxes(board: TBoard): TBoxNode[][] {
        return Boxes._boxPointer.map(({ y, x }) => {
            const box = [];

            for (const boxY of y) {
                for (const boxX of x) {
                    box.push({
                        y: boxY,
                        x: boxX,
                        value: board[boxY][boxX],
                    });
                }
            }

            return box;
        });
    }
}

export default Boxes;
