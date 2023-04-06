export type TBoard = number[][];
export type TBoards = number[][][];

type TDifficulty = {
  mustFill: number;
  inARowMax: number;
  inABoxMax: number;
  numMax: number;
  numMin: number;
};

export interface IDifficulties {
  easy: TDifficulty;
  medium: TDifficulty;
  hard: TDifficulty;
}

export interface ICellCoordinates {
  y: number;
  x: number;
}

export interface ICell extends ICellCoordinates {
  value: number;
}
