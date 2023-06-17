import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import BasicCell from './BasicCell';
import useCellValueHandler from '../../hooks/useCellValueHandler';

interface IDigitCellProps {
  digit: number;
}

interface IStyledProps {
  isFinished: boolean;
}

const lockedStyles = css`
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.secondary};
`;

const StyledDigitCell = styled(BasicCell)<IStyledProps>`
  border-right: 1px solid black;

  ${({ isFinished }) => isFinished && lockedStyles}
  &:last-child {
    border-right: none;
  }
`;

const DigitCell: React.FC<IDigitCellProps> = ({ digit }) => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const { boards } = useAppContext();
  const clickHandler = useCellValueHandler(
    digit
  ) as MouseEventHandler<HTMLDivElement>;

  useEffect(() => {
    setIsFinished(
      boards.currentBoard.every(
        (row) => !!row.find((cellValue) => cellValue === digit)
      )
    );
  }, [boards.currentBoard, digit]);

  return (
    <StyledDigitCell onClick={clickHandler} isFinished={isFinished}>
      {digit}
    </StyledDigitCell>
  );
};

export default DigitCell;
