import { solve } from './solver';
import { copyBlankBoard } from './boardHelper';
import { TBoard, IDifficulties } from '../types/types';
import Boxes from './Boxes';

interface INum {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
  '6': number;
  '7': number;
  '8': number;
  '9': number;
}

type TNumNum = keyof INum;
type TCheckFn = (_: number[], __: number) => boolean;
type TGenerateFn = (difficulty: keyof IDifficulties) => {
  board: TBoard;
  solution: TBoard;
};

export const DIFFICULTY: IDifficulties = {
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

export const generateBoard: TGenerateFn = (difficulty) => {
  let { mustFill } = DIFFICULTY[difficulty];
  const { inARowMax, inABoxMax, numMax } = DIFFICULTY[difficulty];
  const board = copyBlankBoard();
  const solution = solve(board) as TBoard;
  const boxes = new Boxes(board, inABoxMax);
  const nums: INum = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
  };

  while (mustFill) {
    const y = Math.floor(Math.random() * 9);
    const x = Math.floor(Math.random() * 9);
    if (!board[y][x] || board[y][x] !== solution[y][x]) {
      let num: number = solution[y][x];
      const numStr: TNumNum = num.toString() as keyof INum;

      if (mustFill === 1) {
        for (const key in nums) {
          // @ts-ignore
          if (!nums[key]) {
            num = +key;
          }
        }
      }

      board[y][x] = num;
      boxes.setValue(num, y, x);
      nums[numStr]++;
      if (
        isRowFilledProperly(board[y], inARowMax) &&
        boxes.checkBoxes() &&
        nums[numStr] <= numMax
      ) {
        mustFill--;
      } else {
        board[y][x] = 0;
        boxes.resetValue();
        nums[numStr]--;
      }
    }
  }

  return { board, solution };
};
