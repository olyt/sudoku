import React, { MouseEventHandler, useCallback } from 'react';
import { useAppDispatch } from '../../context/AppContext';
import styled from 'styled-components';
import BasicCell from './BasicCell';
import {
    resetClickedCell,
    setClickedCell,
} from '../../context/clickedCell/actions';
import { resetCurrentHint } from '../../context/hints/actions';
import {
    clickedMixin,
    defaultMixin,
    finishedMixin,
    highlightedOrSimilarNumMixin,
    hintMixin,
} from './mixins';
import { ECellStates } from '../../utils/cellState';

export interface IStyledProps extends ICellCoordinates {
    $state: ECellStates;
}

export interface IBoardCellProps extends ICell {
    cellState: ECellStates;
    displayValue: number | null;
    isGameActive: boolean;
    isSelected: boolean;
}

const checkBoldBorder = (coordinate: number): boolean => {
    return coordinate === 3 || coordinate === 6;
};

const CELL_STATE_MIXIN = {
    [ECellStates.clicked]: clickedMixin,
    [ECellStates.highlighted]: highlightedOrSimilarNumMixin,
    [ECellStates.similarNum]: highlightedOrSimilarNumMixin,
    [ECellStates.finished]: finishedMixin,
    [ECellStates.hint]: hintMixin,
    [ECellStates.inactive]: defaultMixin,
} satisfies Record<ECellStates, unknown>;

const StyledBoardCell = styled(BasicCell)<IStyledProps>`
    border-left: ${({ x }) => (checkBoldBorder(x) ? 3 : 1)}px solid black;
    border-top: ${({ y }) => (checkBoldBorder(y) ? 3 : 1)}px solid black;

    ${({ $state }) => CELL_STATE_MIXIN[$state]};

    &:nth-child(9n + 1) {
        border-left: none;
    }

    &:nth-child(-n + 9) {
        border-top: none;
    }
`;

const BoardCell: React.FC<IBoardCellProps> = ({
    cellState,
    displayValue,
    isGameActive,
    isSelected,
    value,
    x,
    y,
}) => {
    const dispatch = useAppDispatch();

    const toggleChecked: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        if (isGameActive) {
            if (isSelected) {
                dispatch(resetClickedCell);

                return;
            }

            dispatch(setClickedCell({ y, x, value }));
            dispatch(resetCurrentHint);
        }
    }, [isGameActive, isSelected, dispatch, y, x, value]);

    return (
        <StyledBoardCell onClick={toggleChecked} x={x} y={y} $state={cellState}>
            {displayValue}
        </StyledBoardCell>
    );
};

export default React.memo(BoardCell);
