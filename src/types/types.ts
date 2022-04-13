export type Board = number[][];
export type Boards = number[][][];
export type GenericObject<T> = {
  [Key: string]: T;
};

type Difficulty = {
  mustFill: number;
  inARowMax: number;
  inABoxMax: number;
  numMax: number;
  numMin: number;
};

export interface Difficulties {
  easy: Difficulty;
  medium: Difficulty;
  hard: Difficulty;
}
