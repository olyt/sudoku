import React, { MouseEventHandler, useCallback, useMemo } from 'react';
import { useAppDispatch, useBoards, useClickedCell, useGameStatus, useHints } from '../../context/AppContext';
import styled from 'styled-components';
import BasicCell from './BasicCell';
import {
    resetClickedCell,
    setClickedCell,
} from '../../context/clickedCell/actions';
import { checkIfBoardPartFinished } from '../../utils/boardHelper';
import { EGameStatus } from '../../context/types';
import { resetCurrentHint } from '../../context/hints/actions';
import {
    clickedMixin,
    defaultMixin,
    finishedMixin,
    highlightedOrSimilarNumMixin,
    hintMixin,
} from './mixins';

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

// TODO: Unify switch to 1 statement with mixins
const StyledBoardCell = styled(BasicCell)<IStyledProps>`
    border-left: ${({ x }) => (checkBoldBorder(x) ? 3 : 1)}px solid black;
    border-top: ${({ y }) => (checkBoldBorder(y) ? 3 : 1)}px solid black;

    ${({ state }) => {
        switch (state) {
            case ECellStates.clicked:
                return clickedMixin;
            case ECellStates.highlighted:
                return highlightedOrSimilarNumMixin;
            case ECellStates.similarNum:
                return highlightedOrSimilarNumMixin;
            case ECellStates.finished:
                return finishedMixin;
            case ECellStates.hint:
                return hintMixin;
            default:
                return defaultMixin;
        }
    }};

    &:nth-child(9n + 1) {
        border-left: none;
    }

    &:nth-child(-n + 9) {
        border-top: none;
    }
`;

const deriveCellState = (
    sameCell: boolean,
    sameY: boolean,
    sameX: boolean,
    sameValue: boolean,
    digitClicked: boolean,
    areaFinished: boolean,
    isHint: boolean
): ECellStates => {
    if (isHint) {
        return ECellStates.hint;
    }

    if (sameCell) {
        return ECellStates.clicked;
    }

    if ((sameY && !sameX) || (!sameY && sameX)) {
        return ECellStates.highlighted;
    }

    if (digitClicked && sameValue) {
        return ECellStates.similarNum;
    }

    if (areaFinished) {
        return ECellStates.finished;
    }

    return ECellStates.inactive;
};

const BoardCell: React.FC<ICell> = React.memo(({ value, x, y }) => {
    const boards = useBoards();
    const clickedCell = useClickedCell();
    const gameStatus = useGameStatus();
    const hints = useHints();
    const dispatch = useAppDispatch();

    const isHint =
        y === hints.currentHint.y &&
        x === hints.currentHint.x &&
        !!hints.currentHint.value;

    const sameCell = clickedCell.y === y && clickedCell.x === x;

    const cellState = useMemo<ECellStates>(() => {
        const sameY = clickedCell.y === y;
        const sameX = clickedCell.x === x;
        const sameValue = clickedCell.value === value;
        const digitClicked =
            clickedCell.y === -1 && clickedCell.x === -1 && !!clickedCell.value;
        const areaFinished =
            !!value && checkIfBoardPartFinished(boards.currentBoard, y, x);

        return deriveCellState(
            sameCell,
            sameY,
            sameX,
            sameValue,
            digitClicked,
            areaFinished,
            isHint
        );
    }, [clickedCell, boards.currentBoard, x, y, value, sameCell, isHint]);

    const toggleChecked: MouseEventHandler<HTMLDivElement> = useCallback(() => {
        if (gameStatus !== EGameStatus.NotStarted) {
            if (sameCell) {
                dispatch(resetClickedCell);

                return;
            }

            dispatch(setClickedCell({ y, x, value }));
            dispatch(resetCurrentHint);
        }
    }, [gameStatus, sameCell, dispatch, y, x, value]);

    return (
        <StyledBoardCell onClick={toggleChecked} x={x} y={y} state={cellState}>
            {value || (isHint && hints.currentHint.value) || null}
        </StyledBoardCell>
    );
});

export default BoardCell;
