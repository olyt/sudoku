import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import BasicCell from './BasicCell';
import useCellValueHandler from '../../hooks/useCellValueHandler';
import { finishedMixin } from './mixins';

interface IDigitCellProps {
    digit: number;
}

interface IStyledProps {
    isFinished: boolean;
}

const StyledDigitCell = styled(BasicCell)<IStyledProps>`
    border-right: 1px solid black;

    ${({ isFinished }) => isFinished && finishedMixin}
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
        setIsFinished(boards.currentBoard.every((row: number[]) => row.includes(digit)));
    }, [boards.currentBoard, digit]);

    return (
        <StyledDigitCell onClick={clickHandler} isFinished={isFinished}>
            {digit}
        </StyledDigitCell>
    );
};

export default DigitCell;
