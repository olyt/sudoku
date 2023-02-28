import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styled from 'styled-components';
import BasicCell from './BasicCell';
import {
  aliceBlue,
  lightBlue,
  middleBlueGreen,
  ming,
} from '../../constants/colors';
import { TCell } from '../../types/types';
import {
  resetClickedCell,
  setClickedCell,
} from '../../context/clickedCell/actions';
import { checkIfBoardPartFinished } from '../../utils/boardHelper';
import { EGameStatus } from '../../context/types';

export enum ECellStates {
  clicked = 'clicked',
  highlighted = 'highlighted',
  similarNum = 'similarNum',
  finished = 'finished',
  inactive = 'inactive',
}

export interface StyledProps {
  x: number;
  y: number;
  state: ECellStates;
}

const checkXLeftBold = (x: number): boolean => x === 3 || x === 6;
const checkYTopBold = (y: number): boolean => y === 3 || y === 6;

const StyledCell = styled(BasicCell)<StyledProps>`
  border-left: ${({ x }) => (checkXLeftBold(x) ? 3 : 1)}px solid black;
  border-top: ${({ y }) => (checkYTopBold(y) ? 3 : 1)}px solid black;
  background: ${({ state }) => {
    switch (state) {
      case ECellStates.clicked:
        return ming;
      case ECellStates.highlighted:
        return middleBlueGreen;
      case ECellStates.similarNum:
        return middleBlueGreen;
      case ECellStates.finished:
        return lightBlue;
      default:
        return aliceBlue;
    }
  }};

  &:nth-child(9n + 1) {
    border-left: none;
  }

  &:nth-child(-n + 9) {
    border-top: none;
  }
`;

const BoardCell: React.FC<TCell> = ({ value, x, y }) => {
  const [cellState, setCellState] = useState<ECellStates>(ECellStates.inactive);
  const { boards, clickedCell, gameInfo, dispatch } = useAppContext();
  const { y: clickedY, x: clickedX, value: clickedValue } = clickedCell;

  useEffect(() => {
    if (clickedY !== y && clickedX !== x) {
      if (value && checkIfBoardPartFinished(boards.currentBoard, y, x)) {
        setCellState(ECellStates.finished);
      } else {
        setCellState(ECellStates.inactive);
      }
    }

    if (
      (clickedY === y || clickedX === x) &&
      (clickedY !== y || clickedX !== x)
    ) {
      setCellState(ECellStates.highlighted);
    }

    if (
      clickedY === -1 &&
      clickedX === -1 &&
      clickedValue &&
      clickedValue === value
    ) {
      setCellState((prev) => {
        if (prev === ECellStates.inactive || prev === ECellStates.finished) {
          return ECellStates.similarNum;
        }
        return prev;
      });
    }

    if (clickedY === y && clickedX === x) {
      setCellState(ECellStates.clicked);
    }
  }, [
    x,
    y,
    clickedY,
    clickedX,
    clickedValue,
    value,
    boards.currentBoard,
    dispatch,
  ]);

  const toggleChecked: () => void = () => {
    if (gameInfo.gameStatus !== EGameStatus.NotStarted) {
      const clickUnmatched = clickedY === y && clickedX === x;

      if (cellState === ECellStates.clicked || clickUnmatched) {
        dispatch(resetClickedCell);
      }

      dispatch(setClickedCell({ y, x, value }));
    }
  };

  return (
    <StyledCell onClick={toggleChecked} x={x} y={y} state={cellState}>
      {value || null}
    </StyledCell>
  );
};

export default BoardCell;
