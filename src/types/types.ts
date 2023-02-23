export type TBoard = number[][];
export type TBoards = number[][][];
export type GenericObject<T> = {
  [Key: string]: T;
};

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

export type TCell = {
  y: number;
  x: number;
  value: number;
};
