import React, { useCallback, useEffect } from 'react';
import BoardCell from '../Cells/BoardCell';
import { useAppContext } from '../../context/AppContext';
import { arrows, digits, escape, numpadDigits } from '../../constants/keyboard';
import { setValueToBoard } from '../../context/actions';
import {
  resetClickedCell,
  setClickedCellCoordinates,
} from '../../context/clickedCell/actions';
import { EGameStatus } from '../../context/types';
import BasicGrid from './BasicGrid';

const BoardGrid: React.FC = () => {
  const { boards, clickedCell, gameInfo, dispatch } = useAppContext();

  const handleDigits = useCallback<(code: string) => void>(
    (code) => {
      const newValue = digits[code] || numpadDigits[code] || 0;

      if (newValue) {
        setValueToBoard(boards, clickedCell, dispatch, newValue);
      }
    },
    [boards, clickedCell, dispatch]
  );

  const calculateNewCoordinate: (
    oldCoordinate: number,
    direction: string
  ) => number = (oldCoordinate, direction) => {
    const [arrowUp, arrowRight, arrowDown, arrowLeft] = arrows;

    if (arrowUp === direction || arrowLeft === direction) {
      return oldCoordinate === 0 ? 8 : oldCoordinate - 1;
    }

    if (arrowRight === direction || arrowDown === direction) {
      return oldCoordinate === 8 ? 0 : oldCoordinate + 1;
    }

    return oldCoordinate;
  };
  const handleArrows = useCallback<(code: string) => void>(
    (code) => {
      if (clickedCell.y === -1 || clickedCell.x === -1) {
        dispatch(setClickedCellCoordinates({ y: 0, x: 0 }));
        return;
      }

      const [arrowUp, arrowRight, arrowDown, arrowLeft] = arrows;
      const { y, x } = clickedCell;
      const newY = calculateNewCoordinate(y, code);
      const newX = calculateNewCoordinate(x, code);

      switch (code) {
        case arrowUp:
          dispatch(setClickedCellCoordinates({ y: newY, x }));
          break;
        case arrowRight:
          dispatch(setClickedCellCoordinates({ y, x: newX }));
          break;
        case arrowDown:
          dispatch(setClickedCellCoordinates({ y: newY, x }));
          break;
        case arrowLeft:
          dispatch(setClickedCellCoordinates({ y, x: newX }));
          break;
        default:
          break;
      }
    },
    [clickedCell, dispatch]
  );

  const onKeyUp = useCallback<(event: KeyboardEvent) => void>(
    (event) => {
      if (gameInfo.gameStatus !== EGameStatus.NotStarted) {
        const { code } = event;

        if (code === escape) {
          dispatch(resetClickedCell);
        }

        if (
          [...Object.keys(digits), ...Object.keys(numpadDigits)].includes(
            code
          ) &&
          !clickedCell.value
        ) {
          handleDigits(code);
        }
      }
    },
    [clickedCell.value, dispatch, gameInfo.gameStatus, handleDigits]
  );

  const onKeyDown = useCallback<(event: KeyboardEvent) => void>(
    (event) => {
      if (arrows.includes(event.code)) {
        handleArrows(event.code);
      }
    },
    [handleArrows]
  );
  useEffect(() => {
    if (gameInfo.gameStatus !== EGameStatus.NotStarted) {
      document.addEventListener('keyup', onKeyUp);
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.removeEventListener('keyup', onKeyUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [gameInfo.gameStatus, onKeyUp, onKeyDown]);

  const cells = boards.currentBoard.map((row, y) =>
    row.map((num, x) => (
      <BoardCell value={num} x={x} y={y} key={`x:${x},y:${y}`} />
    ))
  );

  return (
    <BasicGrid columns={9} rows={9}>
      {cells}
    </BasicGrid>
  );
};

export default BoardGrid;
