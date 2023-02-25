import { TBoard } from '../types/types';

type TBoxNode = {
  x: number;
  y: number;
  value: number;
};

type TBoxCoordinates = {
  y: number[];
  x: number[];
};

class Boxes {
  boxes: TBoxNode[][];
  currentBoxIndex: number;
  currentValueIndex: number;
  private readonly _maxFill: number;
  private static readonly _boxPointer: TBoxCoordinates[] = [
    { y: [0, 1, 2], x: [0, 1, 2] },
    { y: [0, 1, 2], x: [3, 4, 5] },
    { y: [0, 1, 2], x: [6, 7, 8] },
    { y: [3, 4, 5], x: [0, 1, 2] },
    { y: [3, 4, 5], x: [3, 4, 5] },
    { y: [3, 4, 5], x: [6, 7, 8] },
    { y: [6, 7, 8], x: [0, 1, 2] },
    { y: [6, 7, 8], x: [3, 4, 5] },
    { y: [6, 7, 8], x: [6, 7, 8] },
  ];

  private static findCurrentBoxForCell(y: number, x: number): TBoxCoordinates {
    return this._boxPointer.find(({ y: boxYs, x: boxXs }) => {
      return !!~boxYs.indexOf(y) && !!~boxXs.indexOf(x);
    }) as TBoxCoordinates;
  }

  public static checkFinishedBoxes(
    board: TBoard,
    y: number,
    x: number
  ): boolean {
    const { y: boxYs, x: boxXs } = this.findCurrentBoxForCell(y, x);

    for (const boxY of boxYs) {
      for (const boxX of boxXs) {
        if (!board[boxY][boxX]) {
          return false;
        }
      }
    }

    return true;
  }

  constructor(board: TBoard, maxFill: number) {
    this._maxFill = maxFill;
    this.currentBoxIndex = -1;
    this.currentValueIndex = -1;
    this.boxes = this.generateInitialBoxes(board);
  }

  public setValue(value: number, y: number, x: number): void {
    this.boxes.forEach((box, boxIndex) => {
      box.forEach((node, valueIndex) => {
        if (node.x === x && node.y === y) {
          this.currentValueIndex = valueIndex;
          this.currentBoxIndex = boxIndex;
        }
      });
    });

    this.boxes[this.currentBoxIndex][this.currentValueIndex].value = value;
  }

  public resetValue(): void {
    this.boxes[this.currentBoxIndex][this.currentValueIndex].value = 0;
  }

  private isBoxFilledProperly(box: TBoxNode[]): boolean {
    let count = 0;
    for (let i = 0; i < box.length; i++) {
      if (box[i].value) count++;
      if (count > this._maxFill) return false;
    }

    return true;
  }

  public checkBoxes(): boolean {
    return this.isBoxFilledProperly(this.boxes[this.currentBoxIndex]);
  }

  private generateInitialBoxes(board: TBoard): TBoxNode[][] {
    return [
      [
        { y: 0, x: 0, value: board[0][0] },
        { y: 0, x: 1, value: board[0][1] },
        { y: 0, x: 2, value: board[0][2] },
        { y: 1, x: 0, value: board[1][0] },
        { y: 1, x: 1, value: board[1][1] },
        { y: 1, x: 2, value: board[1][2] },
        { y: 2, x: 0, value: board[2][0] },
        { y: 2, x: 1, value: board[2][1] },
        { y: 2, x: 2, value: board[2][2] },
      ],
      [
        { y: 0, x: 3, value: board[0][3] },
        { y: 0, x: 4, value: board[0][4] },
        { y: 0, x: 5, value: board[0][5] },
        { y: 1, x: 3, value: board[1][3] },
        { y: 1, x: 4, value: board[1][4] },
        { y: 1, x: 5, value: board[1][5] },
        { y: 2, x: 3, value: board[2][3] },
        { y: 2, x: 4, value: board[2][4] },
        { y: 2, x: 5, value: board[2][5] },
      ],
      [
        { y: 0, x: 6, value: board[0][6] },
        { y: 0, x: 7, value: board[0][7] },
        { y: 0, x: 8, value: board[0][8] },
        { y: 1, x: 6, value: board[1][6] },
        { y: 1, x: 7, value: board[1][7] },
        { y: 1, x: 8, value: board[1][8] },
        { y: 2, x: 6, value: board[2][6] },
        { y: 2, x: 7, value: board[2][7] },
        { y: 2, x: 8, value: board[2][8] },
      ],
      [
        { y: 3, x: 0, value: board[3][0] },
        { y: 3, x: 1, value: board[3][1] },
        { y: 3, x: 2, value: board[3][2] },
        { y: 4, x: 0, value: board[4][0] },
        { y: 4, x: 1, value: board[4][1] },
        { y: 4, x: 2, value: board[4][2] },
        { y: 5, x: 0, value: board[5][0] },
        { y: 5, x: 1, value: board[5][1] },
        { y: 5, x: 2, value: board[5][2] },
      ],
      [
        { y: 3, x: 3, value: board[3][3] },
        { y: 3, x: 4, value: board[3][4] },
        { y: 3, x: 5, value: board[3][5] },
        { y: 4, x: 3, value: board[4][3] },
        { y: 4, x: 4, value: board[4][4] },
        { y: 4, x: 5, value: board[4][5] },
        { y: 5, x: 3, value: board[5][3] },
        { y: 5, x: 4, value: board[5][4] },
        { y: 5, x: 5, value: board[5][5] },
      ],
      [
        { y: 3, x: 6, value: board[3][6] },
        { y: 3, x: 7, value: board[3][7] },
        { y: 3, x: 8, value: board[3][8] },
        { y: 4, x: 6, value: board[4][6] },
        { y: 4, x: 7, value: board[4][7] },
        { y: 4, x: 8, value: board[4][8] },
        { y: 5, x: 6, value: board[5][6] },
        { y: 5, x: 7, value: board[5][7] },
        { y: 5, x: 8, value: board[5][8] },
      ],
      [
        { y: 6, x: 0, value: board[6][0] },
        { y: 6, x: 1, value: board[6][1] },
        { y: 6, x: 2, value: board[6][2] },
        { y: 7, x: 0, value: board[7][0] },
        { y: 7, x: 1, value: board[7][1] },
        { y: 7, x: 2, value: board[7][2] },
        { y: 8, x: 0, value: board[8][0] },
        { y: 8, x: 1, value: board[8][1] },
        { y: 8, x: 2, value: board[8][2] },
      ],
      [
        { y: 6, x: 3, value: board[6][3] },
        { y: 6, x: 4, value: board[6][4] },
        { y: 6, x: 5, value: board[6][5] },
        { y: 7, x: 3, value: board[7][3] },
        { y: 7, x: 4, value: board[7][4] },
        { y: 7, x: 5, value: board[7][5] },
        { y: 8, x: 3, value: board[8][3] },
        { y: 8, x: 4, value: board[8][4] },
        { y: 8, x: 5, value: board[8][5] },
      ],
      [
        { y: 6, x: 6, value: board[6][6] },
        { y: 6, x: 7, value: board[6][7] },
        { y: 6, x: 8, value: board[6][8] },
        { y: 7, x: 6, value: board[7][6] },
        { y: 7, x: 7, value: board[7][7] },
        { y: 7, x: 8, value: board[7][8] },
        { y: 8, x: 6, value: board[8][6] },
        { y: 8, x: 7, value: board[8][7] },
        { y: 8, x: 8, value: board[8][8] },
      ],
    ];
  }
}

export default Boxes;
