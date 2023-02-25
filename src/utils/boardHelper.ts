import { TBoard } from '../types/types';

type TCopyBoard = (board: TBoard) => TBoard;
type TSetValueToBoard = (
  board: TBoard,
  cell: { y: number; x: number; value: number }
) => TBoard;

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

export const copyBoard: TCopyBoard = (board) =>
  board.map((row) => row.map((num) => num));

export const updateValueOnBoard: TSetValueToBoard = (board, cell) => {
  return board.map((row, y) => {
    return row.map((currentValue, x) => {
      return cell.y === y && cell.x === x ? cell.value : currentValue;
    });
  });
};

export const copyBlankBoard = (): TBoard => {
  return BLANK_BOARD.map((row: number[]) => {
    return row.map((i) => i);
  });
};

const checkFinishedRow: (board: TBoard, row: number) => boolean = (
  board,
  row
) => {
  return board[row].every((num) => !!num);
};

const checkFinishedColumn: (board: TBoard, column: number) => boolean = (
  board,
  column
) => {
  return board.every((row) => !!row[column]);
};

export const checkIfBoardPartFinished: (
  board: TBoard,
  y: number,
  x: number
) => boolean = (board, y, x) => {
  return checkFinishedRow(board, y) || checkFinishedColumn(board, x);
};
