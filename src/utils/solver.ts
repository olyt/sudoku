import { Board, Boards } from '../types/types';

const BOX_COORDINATES = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

type solution = (boards: Boards) => Board | boolean;
type solvedFn = (board: Board) => boolean;
type solveFn = (board: Board) => Board | boolean;
type nextBoardsFn = (board: Board) => Boards;
type findSquareFn = (board: Board) => number[] | void;
type isValidFn = (board: Board) => boolean;
type isValidBoardsFn = (boards: Boards) => Boards;

const searchForSolution: solution = (validBoards) => {
  if (!validBoards.length) return false;

  const first = validBoards.shift();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tryPath = solve(first!);

  return tryPath ? tryPath : searchForSolution(validBoards);
};

const solved: solvedFn = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!board[i][j]) {
        return false;
      }
    }
  }

  return true;
};

const nextBoards: nextBoardsFn = (board) => {
  const res = [];
  const firstEmpty = findEmptySquare(board);

  if (firstEmpty) {
    const [y, x] = firstEmpty;

    for (let i = 1; i <= 9; i++) {
      const newBoard = [...board];
      const row = [...newBoard[y]];
      // row[x] = i;
      row[x] = Math.floor(Math.random() * 9 + 1);
      newBoard[y] = row;
      res.push(newBoard);
    }
  }

  return res;
};

const findEmptySquare: findSquareFn = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (!board[i][j]) {
        return [i, j];
      }
    }
  }
};

const isValidRow: isValidFn = (board) => {
  for (let i = 0; i < 9; i++) {
    const current: number[] = [];
    for (let j = 0; j < 9; j++) {
      if (current.includes(board[i][j])) {
        return false;
      } else if (board[i][j]) {
        current.push(board[i][j]);
      }
    }
  }

  return true;
};

const isValidColumn: isValidFn = (board) => {
  for (let i = 0; i < 9; i++) {
    const current: number[] = [];
    for (let j = 0; j < 9; j++) {
      if (current.includes(board[j][i])) {
        return false;
      } else if (board[j][i]) {
        current.push(board[j][i]);
      }
    }
  }

  return true;
};

const isValidBoxes: isValidFn = (board) => {
  for (let y = 0; y < 9; y += 3) {
    for (let x = 0; x < 9; x += 3) {
      const current: number[] = [];
      for (let i = 0; i < 9; i++) {
        const coordinates = [...BOX_COORDINATES[i]];
        coordinates[0] += y;
        coordinates[1] += x;

        if (current.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]]) {
          current.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }

  return true;
};

const validBoard: isValidFn = (board) => {
  return isValidRow(board) && isValidColumn(board) && isValidBoxes(board);
};

const keepOnlyValid: isValidBoardsFn = (boards) => {
  return boards.filter((board: Board) => {
    return validBoard(board);
  });
};

export const solve: solveFn = (board) => {
  if (solved(board)) return board;

  const possibilities = nextBoards(board);
  const validBoards: Boards = keepOnlyValid(possibilities);

  return searchForSolution(validBoards);
};
