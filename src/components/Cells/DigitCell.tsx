import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import BasicCell from './BasicCell';
import useCellValueHandler from '../../hooks/useCellValueHandler';

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
  const { boards } = useAppContext();
  const clickHandler = useCellValueHandler(
    digit
  ) as MouseEventHandler<HTMLDivElement>;

  useEffect(() => {
    setIsLocked(
      boards.currentBoard.every(
        (row) => !!row.find((cellValue) => cellValue === digit)
      )
    );
  }, [boards.currentBoard, digit]);

  return (
    <StyledDigitCell onClick={clickHandler} isLocked={isLocked}>
      {digit}
    </StyledDigitCell>
  );
};

export default DigitCell;
