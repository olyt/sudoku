import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { resetClickedCell, setClickedCell } from '../../context/actions';
import { aliceBlue, middleBlueGreen, ming } from '../../utils/COLORS';

enum ECellStates {
  clicked = 'clicked',
  highlighted = 'highlighted',
  similarNum = 'similarNum',
  inactive = 'inactive',
}

interface ICellProps {
  val: number;
  x: number;
  y: number;
}

interface IStyledProps {
  x: number;
  y: number;
  state: ECellStates;
  a?: boolean;
  b?: boolean;
}

type TCheckCoordinate = (_: number) => boolean;

const checkXLeft: TCheckCoordinate = (x) => x === 0 || x === 3 || x === 6;

const checkYTop: TCheckCoordinate = (y) => y === 0 || y === 3 || y === 6;

const StyledCell = styled.div<IStyledProps>`
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
  cursor: pointer;
`;

const Cell: React.FC<ICellProps> = ({ val, x, y }) => {
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

export default Cell;
