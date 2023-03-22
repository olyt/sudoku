import { TBoard, TCell } from '../types/types';
import Boxes from './Boxes';

type TCopyBoard = (board: TBoard) => TBoard;
type TBoardValueSetter = (board: TBoard, cell: TCell) => TBoard;
type TBoardAxisChecker = (board: TBoard, axisCoordinate: number) => boolean;

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

export const updateValueOnBoard: TBoardValueSetter = (board, cell) => {
  return board.map((row, y) => {
    return row.map((currentValue, x) => {
      return cell.y === y && cell.x === x ? cell.value : currentValue;
    });
  });
};

export const getBlankBoard = (): TBoard => {
  return BLANK_BOARD.map((row: number[]) => {
    return row.map((i) => i);
  });
};

const checkFinishedRow: TBoardAxisChecker = (board, row) => {
  return board[row].every((num) => !!num);
};

const checkFinishedColumn: TBoardAxisChecker = (board, column) => {
  return board.every((row) => !!row[column]);
};

export const checkIfBoardPartFinished = (
  board: TBoard,
  y: number,
  x: number
): boolean => {
  return (
    checkFinishedRow(board, y) ||
    checkFinishedColumn(board, x) ||
    Boxes.checkFinishedBoxes(board, y, x)
  );
};
