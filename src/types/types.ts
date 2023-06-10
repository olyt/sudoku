export type TBoard = number[][];
export type TBoards = number[][][];

type TDifficulty = {
  mustFill: number;
  inARowMax: number;
  inABoxMax: number;
  numMax: number;
  numMin: number;
};

export enum EDifficulties {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export type IDifficulties = {
  [key in EDifficulties]: TDifficulty;
};

export interface ICellCoordinates {
  y: number;
  x: number;
}

export interface ICell extends ICellCoordinates {
  value: number;
}
