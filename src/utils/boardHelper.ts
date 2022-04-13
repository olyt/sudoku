import { Board } from '../types/types';

type CopyBoard = (board: Board) => Board;
type SetValueToBoard = (
  board: Board,
  cell: { y: number; x: number; value: number }
) => Board;

const BLANK_BOARD: Board = [
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

export const copyBoard: CopyBoard = (board) =>
  board.map((row) => row.map((num) => num));

export const updateValueOnBoard: SetValueToBoard = (board, cell) => {
  return board.map((row, y) => {
    return row.map((currentValue, x) => {
      return cell.y === y && cell.x === x ? cell.value : currentValue;
    });
  });
};

export const copyBlankBoard = (): Board => {
  return BLANK_BOARD.map((row: number[]) => {
    return row.map((i) => i);
  });
};
