import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { resetClickedCell, setClickedCell } from '../../context/actions';
import styled from 'styled-components';
import BasicCell from './BasicCell';
import { aliceBlue, middleBlueGreen, ming } from '../../utils/COLORS';

export enum ECellStates {
  clicked = 'clicked',
  highlighted = 'highlighted',
  similarNum = 'similarNum',
  inactive = 'inactive',
}

export interface CellProps {
  val: number;
  x: number;
  y: number;
}

export interface StyledProps {
  x: number;
  y: number;
  state: ECellStates;
  a?: boolean;
  b?: boolean;
}

const StyledCell = styled(BasicCell)<StyledProps>`
  background: ${({ state }) => {
    switch (state) {
      case ECellStates.clicked:
        return ming;
      case ECellStates.highlighted:
        return middleBlueGreen;
      case ECellStates.similarNum:
        return middleBlueGreen;
      default:
        return aliceBlue;
    }
  }};
`;

const BoardCell: React.FC<CellProps> = ({ val, x, y }) => {
  const [cellState, setCellState] = useState(ECellStates.inactive);
  const { state, dispatch } = useAppContext();
  const { y: clickedY, x: clickedX, value } = state.clickedCell;

  useEffect(() => {
    if (clickedY !== y && clickedX !== x) {
      setCellState(ECellStates.inactive);
    }

    if (
      (clickedY === y || clickedX === x) &&
      (clickedY !== y || clickedX !== x)
    ) {
      setCellState(ECellStates.highlighted);
    }

    if (clickedY === -1 && clickedX === -1 && value && value === val) {
      setCellState((prev) => {
        if (prev === ECellStates.inactive) {
          return ECellStates.similarNum;
        }
        return prev;
      });
    }
  }, [x, y, clickedY, clickedX, value, val]);

  const toggleChecked: () => void = () => {
    setCellState((prev) => {
      const clickUnmatched = clickedY === y && clickedX === x;

      if (prev === ECellStates.clicked || clickUnmatched) {
        dispatch(resetClickedCell);
        return ECellStates.inactive;
      }

      dispatch(setClickedCell({ y, x, value: val }));
      return ECellStates.clicked;
    });
  };

  return (
    <StyledCell onClick={toggleChecked} x={x} y={y} state={cellState}>
      {val || null}
    </StyledCell>
  );
};

export default BoardCell;
