declare type TBoard = number[][];

declare type TBoards = number[][][];

declare type TDifficulty = {
    mustFill: number;
    inARowMax: number;
    inABoxMax: number;
    numMax: number;
    numMin: number;
};

declare enum EDifficulties {
    easy = 'easy',
    medium = 'medium',
    hard = 'hard',
}

declare type IDifficulties = {
    [key in EDifficulties]: TDifficulty;
};

declare interface ICellCoordinates {
    y: number;
    x: number;
}

declare interface ICell extends ICellCoordinates {
    value: number;
}
