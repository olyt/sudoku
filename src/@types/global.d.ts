/** A 9x9 Sudoku board represented as a 2D array of numbers (0 = empty) */
declare type TBoard = number[][];

/** An array of boards, used during solving to track candidate solutions */
declare type TBoards = number[][][];

/** Configuration for a difficulty level controlling board generation constraints */
declare type TDifficulty = {
    /** Total number of pre-filled cells in the puzzle */
    mustFill: number;
    /** Maximum consecutive filled cells allowed in a single row */
    inARowMax: number;
    /** Maximum filled cells allowed in a single 3x3 box */
    inABoxMax: number;
    /** Maximum occurrences of any single digit across the puzzle */
    numMax: number;
    /** Minimum occurrences of any single digit across the puzzle */
    numMin: number;
};

/** Available difficulty levels */
declare enum EDifficulties {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
}

/** Maps each difficulty level to its configuration */
declare type IDifficulties = {
    [key in EDifficulties]: TDifficulty;
};

/** Row (y) and column (x) coordinates of a cell on the board */
declare interface ICellCoordinates {
    y: number;
    x: number;
}

/** A cell with coordinates and its current digit value */
declare interface ICell extends ICellCoordinates {
    value: number;
}
