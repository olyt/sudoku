import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styled from 'styled-components';
import BasicCell from './BasicCell';
import { ICell, ICellCoordinates } from '../../types/types';
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

export interface IStyledProps extends ICellCoordinates {
  state: ECellStates;
}

const checkBoldBorder = (coordinate: number): boolean => {
  return coordinate === 3 || coordinate === 6;
};

const StyledBoardCell = styled(BasicCell)<IStyledProps>`
  border-left: ${({ x }) => (checkBoldBorder(x) ? 3 : 1)}px solid black;
  border-top: ${({ y }) => (checkBoldBorder(y) ? 3 : 1)}px solid black;
  color: ${({ state, theme }) => {
    switch (state) {
      case ECellStates.clicked:
        return theme.primaryLight;
      case ECellStates.finished:
        return theme.primary;
      default:
        return 'black';
    }
  }};
  background: ${({ state, theme }) => {
    switch (state) {
      case ECellStates.clicked:
        return theme.primary;
      case ECellStates.highlighted:
        return theme.secondary;
      case ECellStates.similarNum:
        return theme.secondary;
      case ECellStates.finished:
        return theme.secondaryLight;
      default:
        return theme.primaryLight;
    }
  }};

  &:nth-child(9n + 1) {
    border-left: none;
  }

  &:nth-child(-n + 9) {
    border-top: none;
  }
`;

const BoardCell: React.FC<ICell> = ({ value, x, y }) => {
  const [cellState, setCellState] = useState<ECellStates>(ECellStates.inactive);
  const { boards, clickedCell, gameInfo, dispatch } = useAppContext();
  const currentMoveInfo = useMemo<{ [Key: string]: boolean }>(
    () => ({
      sameY: clickedCell.y === y,
      sameX: clickedCell.x === x,
      sameCell: clickedCell.y === y && clickedCell.x === x,
      sameValue: clickedCell.value === value,
      digitClicked:
        clickedCell.y === -1 && clickedCell.x === -1 && !!clickedCell.value,
      areaFinished:
        !!value && checkIfBoardPartFinished(boards.currentBoard, y, x),
    }),
    [clickedCell, boards.currentBoard, x, y, value]
  );

  useEffect(() => {
    const { sameCell, sameValue, areaFinished, digitClicked, sameY, sameX } =
      currentMoveInfo;

    if (!sameCell) {
      if (areaFinished) {
        setCellState(ECellStates.finished);
      } else {
        setCellState(ECellStates.inactive);
      }
    }

    if ((sameY && !sameX) || (!sameY && sameX)) {
      setCellState(ECellStates.highlighted);
    }

    if (digitClicked && sameValue) {
      setCellState((prev) => {
        if (prev === ECellStates.inactive || prev === ECellStates.finished) {
          return ECellStates.similarNum;
        }
        return prev;
      });
    }

    if (sameCell) {
      setCellState(ECellStates.clicked);
    }
  }, [currentMoveInfo]);

  const toggleChecked: MouseEventHandler<HTMLDivElement> = () => {
    if (gameInfo.gameStatus !== EGameStatus.NotStarted) {
      const clickUnmatched = clickedCell.y === y && clickedCell.x === x;

      if (cellState === ECellStates.clicked || clickUnmatched) {
        dispatch(resetClickedCell);
        return;
      }

      dispatch(setClickedCell({ y, x, value }));
    }
  };

  return (
    <StyledBoardCell onClick={toggleChecked} x={x} y={y} state={cellState}>
      {value || null}
    </StyledBoardCell>
  );
};

export default BoardCell;
