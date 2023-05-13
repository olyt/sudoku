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
import { resetCurrentHint } from '../../context/hints/actions';

export enum ECellStates {
  clicked = 'clicked',
  highlighted = 'highlighted',
  similarNum = 'similarNum',
  finished = 'finished',
  hint = 'hint',
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
      case ECellStates.hint:
        return theme.secondaryHint;
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
      case ECellStates.hint:
        return theme.primaryHint;
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
  const { boards, clickedCell, gameInfo, hints, dispatch } = useAppContext();
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
      isHint:
        y === hints.currentHint.y &&
        x === hints.currentHint.x &&
        !!hints.currentHint.value,
    }),
    [clickedCell, boards.currentBoard, hints.currentHint, x, y, value]
  );

  useEffect(() => {
    const {
      sameCell,
      sameValue,
      areaFinished,
      digitClicked,
      sameY,
      sameX,
      isHint,
    } = currentMoveInfo;

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

    if (isHint) {
      setCellState(ECellStates.hint);
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
      dispatch(resetCurrentHint);
    }
  };

  return (
    <StyledBoardCell onClick={toggleChecked} x={x} y={y} state={cellState}>
      {value || (currentMoveInfo.isHint && hints.currentHint.value) || null}
    </StyledBoardCell>
  );
};

export default BoardCell;
