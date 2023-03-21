import { solve } from './solver';
import { copyBlankBoard } from './boardHelper';
import { IDifficulties, TBoard, TCellCoordinates } from '../types/types';
import Boxes from './Boxes';

type TCheckFn = (_: number[], __: number) => boolean;
type TGenerateFn = (
  difficulty: keyof IDifficulties
) => [board: TBoard, solution: TBoard];

export const DIFFICULTIES: IDifficulties = {
  easy: {
    mustFill: 50,
    inARowMax: 8,
    inABoxMax: 7,
    numMax: 8,
    numMin: 1,
  },
  medium: {
    mustFill: 40,
    inARowMax: 5,
    inABoxMax: 6,
    numMax: 6,
    numMin: 1,
  },
  hard: {
    mustFill: 24,
    inARowMax: 3,
    inABoxMax: 4,
    numMax: 4,
    numMin: 1,
  },
};

const isRowFilledProperly: TCheckFn = (row, maxFill) => {
  let count = 0;

  for (let i = 0; i < row.length; i++) {
    if (row[i]) count++;

    if (count > maxFill) return false;

    if (row[i] && !row[i + 1]) count = 0;
  }

  return true;
};

const getMirroredCoordinates = (board: TBoard): TCellCoordinates[] => {
  const swap: { y: number; x: number }[] = [];

  for (let row = 0; row < 8; row++) {
    for (let nextRow = row + 1; nextRow < 9; nextRow++) {
      const columns = getMirroredColumns(board[row], board[nextRow]);

      if (columns.size) {
        columns.forEach((column) => {
          swap.push({ y: row, x: column });
          swap.push({ y: nextRow, x: column });
        });
      }
    }
  }

  return swap;
};

const getMirroredColumns = (row: number[], nextRow: number[]): Set<number> => {
  const mirroredIndices: Set<number> = new Set();

  row.forEach((cellValue, column) => {
    const nextRowIndex = nextRow.indexOf(cellValue);
    if (column !== nextRowIndex && nextRow[column] === row[nextRowIndex]) {
      mirroredIndices.add(column);
      mirroredIndices.add(nextRowIndex);
    }
  });

  return mirroredIndices;
};

export const generateBoard: TGenerateFn = (difficulty) => {
  let { mustFill } = DIFFICULTIES[difficulty];
  const { inARowMax, inABoxMax, numMax } = DIFFICULTIES[difficulty];
  const board = copyBlankBoard();
  const solution = solve(board) as TBoard;
  const boxes = new Boxes(board, inABoxMax);
  const numbersCounter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const mirroredCoordinates = getMirroredCoordinates(solution);
  let atLeastOneMirroredDilled = !mirroredCoordinates.length;

  while (mustFill) {
    let y: number;
    let x: number;

    if (!atLeastOneMirroredDilled) {
      const { y: swapY, x: swapX } =
        mirroredCoordinates[
          Math.floor(Math.random() * mirroredCoordinates.length)
        ];
      y = swapY;
      x = swapX;
      atLeastOneMirroredDilled = true;
    } else {
      y = Math.floor(Math.random() * 9);
      x = Math.floor(Math.random() * 9);
    }

    if (!board[y][x] || board[y][x] !== solution[y][x]) {
      let num: number = solution[y][x];

      if (mustFill === 1) {
        for (let i = 1; i < numbersCounter.length; i++) {
          if (!numbersCounter[i]) {
            num = i;
          }
        }
      }

      board[y][x] = num;
      boxes.setValue(num, y, x);
      numbersCounter[num]++;
      if (
        isRowFilledProperly(board[y], inARowMax) &&
        boxes.checkBoxes() &&
        numbersCounter[num] <= numMax
      ) {
        mustFill--;
      } else {
        board[y][x] = 0;
        boxes.resetValue();
        numbersCounter[num]--;
      }
    }
  }

  return [board, solution];
};
