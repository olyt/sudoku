import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { setValueToBoard } from '../../context/actions';
import BasicCell from './BasicCell';
import { setClickedCellValue } from '../../context/clickedCell/actions';

interface IDigitCellProps {
  digit: number;
}

interface IStyledProps {
  isLocked: boolean;
}

const lockedStyles = css`
  cursor: default;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.secondary};
  pointer-events: none;
`;

const StyledNumBox = styled(BasicCell)<IStyledProps>`
  border-right: 1px solid black;

  ${({ isLocked }) => isLocked && lockedStyles}
  &:last-child {
    border-right: none;
  }
`;

const DigitCell: React.FC<IDigitCellProps> = ({ digit }) => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const { boards, clickedCell, dispatch } = useAppContext();
  const { y, x, value: clickedValue } = clickedCell;

  useEffect(() => {
    setIsLocked(
      boards.currentBoard.every(
        (row) => !!row.find((cellValue) => cellValue === digit)
      )
    );
  }, [boards.currentBoard, digit]);

  const setNumToCellOrHighlight: MouseEventHandler<HTMLDivElement> = () => {
    if (!isLocked) {
      if (y !== -1 && x !== -1 && !clickedValue) {
        setValueToBoard(boards, clickedCell, dispatch, digit);
      } else {
        dispatch(setClickedCellValue(digit));
      }
    }
  };

  return (
    <StyledNumBox onClick={setNumToCellOrHighlight} isLocked={isLocked}>
      {digit}
    </StyledNumBox>
  );
};

export default DigitCell;
