import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { resetClickedCell, setClickedCell } from '../../context/actions';
import { aliceBlue, middleBlueGreen, ming } from '../../utils/COLORS';

enum CellStates {
  clicked = 'clicked',
  highlighted = 'highlighted',
  similarNum = 'similarNum',
  inactive = 'inactive',
}

interface CellProps {
  val: number;
  x: number;
  y: number;
}

interface StyledProps {
  x: number;
  y: number;
  state: CellStates;
  a?: boolean;
  b?: boolean;
}

type checkCoordinate = (_: number) => boolean;

const checkXLeft: checkCoordinate = (x) => x === 0 || x === 3 || x === 6;

const checkYTop: checkCoordinate = (y) => y === 0 || y === 3 || y === 6;

const StyledCell = styled.div<StyledProps>`
  font-size: 25px;
  border-left: ${({ x }) =>
    checkXLeft(x) ? '3px solid black' : '1px solid black'};
  border-top: ${({ y }) =>
    checkYTop(y) ? '3px solid black' : '1px solid black'};
  border-right: ${({ x }) => x === 8 && '3px solid black'};
  border-bottom: ${({ y }) => y === 8 && '3px solid black'};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ state }) => {
    switch (state) {
      case CellStates.clicked:
        return ming;
      case CellStates.highlighted:
        return middleBlueGreen;
      case CellStates.similarNum:
        return middleBlueGreen;
      default:
        return aliceBlue;
    }
  }};
  cursor: pointer;
`;

const Cell: React.FC<CellProps> = ({ val, x, y }) => {
  const [cellState, setCellState] = useState(CellStates.inactive);
  const { state, dispatch } = useAppContext();
  const { y: clickedY, x: clickedX, value } = state.clickedCell;

  useEffect(() => {
    if (clickedY !== y && clickedX !== x) {
      setCellState(CellStates.inactive);
    }

    if (
      (clickedY === y || clickedX === x) &&
      (clickedY !== y || clickedX !== x)
    ) {
      setCellState(CellStates.highlighted);
    }

    if (clickedY === -1 && clickedX === -1 && value && value === val) {
      setCellState((prev) => {
        if (prev === CellStates.inactive) {
          return CellStates.similarNum;
        }
        return prev;
      });
    }
  }, [x, y, clickedY, clickedX, value, val]);

  const toggleChecked: () => void = () => {
    setCellState((prev) => {
      const clickUnmatched = clickedY === y && clickedX === x;

      if (prev === CellStates.clicked || clickUnmatched) {
        dispatch(resetClickedCell);
        return CellStates.inactive;
      }

      dispatch(setClickedCell({ y, x, value: val }));
      return CellStates.clicked;
    });
  };

  return (
    <StyledCell onClick={toggleChecked} x={x} y={y} state={cellState}>
      {val || null}
    </StyledCell>
  );
};

export default Cell;
