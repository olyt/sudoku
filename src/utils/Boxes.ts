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
    return Boxes._boxPointer.map(({ y, x }) => {
      const box = [];

      for (const boxY of y) {
        for (const boxX of x) {
          box.push({
            y: boxY,
            x: boxX,
            value: board[boxY][boxX],
          });
        }
      }

      return box;
    });
  }
}

export default Boxes;
