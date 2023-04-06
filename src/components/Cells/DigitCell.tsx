import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { setValueToBoard } from '../../context/operations';
import BasicCell from './BasicCell';
import { setClickedCell } from '../../context/clickedCell/actions';

interface IDigitCellProps {
  digit: number;
}

interface IStyledProps {
  isLocked: boolean;
}

const lockedStyles = css`
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.secondary};
`;

const StyledDigitCell = styled(BasicCell)<IStyledProps>`
  border-right: 1px solid black;

  ${({ isLocked }) => isLocked && lockedStyles}
  &:last-child {
    border-right: none;
  }
`;

const DigitCell: React.FC<IDigitCellProps> = ({ digit }) => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const { boards, clickedCell, dispatch } = useAppContext();
  const { y, x } = clickedCell;

  useEffect(() => {
    setIsLocked(
      boards.currentBoard.every(
        (row) => !!row.find((cellValue) => cellValue === digit)
      )
    );
  }, [boards.currentBoard, digit]);

  const setNumToCellOrHighlight: MouseEventHandler<HTMLDivElement> = () => {
    if (y !== -1 && x !== -1 && !boards.initialBoard[y][x]) {
      dispatch(setValueToBoard(digit));
    } else {
      dispatch(setClickedCell({ y: -1, x: -1, value: digit }));
    }
  };

  return (
    <StyledDigitCell onClick={setNumToCellOrHighlight} isLocked={isLocked}>
      {digit}
    </StyledDigitCell>
  );
};

export default DigitCell;
