import React, { useEffect, useEffectEvent, useMemo } from 'react';
import BoardCell from '../Cells/BoardCell';
import {
    useAppDispatch,
    useClickedCell,
    useCurrentBoard,
    useHints,
    useIsGameActive,
} from '../../context/AppContext';
import { arrows, digits, escape, numpadDigits } from '../../constants/keyboard';
import {
    resetClickedCell,
    setClickedCell,
    setClickedCellCoordinates,
} from '../../context/clickedCell/actions';
import BasicGrid from './BasicGrid';
import useCellValueHandler, {
    THandlerCreator,
} from '../../hooks/useCellValueHandler';
import { getBoxIndex, getFinishedAreas } from '../../utils/boardHelper';
import { deriveCellState } from '../../utils/cellState';

const calculateNewCoordinate = (
    oldCoordinate: number,
    direction: string
): number => {
    const [arrowUp, arrowRight, arrowDown, arrowLeft] = arrows;

    if (arrowUp === direction || arrowLeft === direction) {
        return oldCoordinate === 0 ? 8 : oldCoordinate - 1;
    }

    if (arrowRight === direction || arrowDown === direction) {
        return oldCoordinate === 8 ? 0 : oldCoordinate + 1;
    }

    return oldCoordinate;
};

const BoardGrid: React.FC = () => {
    const currentBoard = useCurrentBoard();
    const clickedCell = useClickedCell();
    const hints = useHints();
    const isGameActive = useIsGameActive();
    const dispatch = useAppDispatch();
    const digitHandlerCreator = useCellValueHandler() as THandlerCreator;
    const finishedAreas = useMemo(
        () => getFinishedAreas(currentBoard),
        [currentBoard]
    );

    const onKeyUp = useEffectEvent((event: KeyboardEvent) => {
        const { code } = event;

        if (code === escape) {
            dispatch(resetClickedCell);
        }

        if (
            [...Object.keys(digits), ...Object.keys(numpadDigits)].includes(code)
        ) {
            const newValue = digits[code] || numpadDigits[code] || 0;

            if (newValue) {
                digitHandlerCreator<undefined>(newValue)();
            }
        }
    });

    const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
        const { code } = event;

        if (!arrows.includes(code)) {
            return;
        }

        if (clickedCell.y === -1 || clickedCell.x === -1) {
            dispatch(setClickedCellCoordinates({ y: 0, x: 0 }));

            return;
        }

        const [arrowUp, arrowRight, arrowDown, arrowLeft] = arrows;
        const { y, x } = clickedCell;
        const newY = calculateNewCoordinate(y, code);
        const newX = calculateNewCoordinate(x, code);

        switch (code) {
            case arrowUp:
                dispatch(
                    setClickedCell({
                        y: newY,
                        x,
                        value: currentBoard[newY][x],
                    })
                );
                break;
            case arrowRight:
                dispatch(
                    setClickedCell({
                        y,
                        x: newX,
                        value: currentBoard[y][newX],
                    })
                );
                break;
            case arrowDown:
                dispatch(
                    setClickedCell({
                        y: newY,
                        x,
                        value: currentBoard[newY][x],
                    })
                );
                break;
            case arrowLeft:
                dispatch(
                    setClickedCell({
                        y,
                        x: newX,
                        value: currentBoard[y][newX],
                    })
                );
                break;
            default:
                break;
        }
    });

    useEffect(() => {
        if (isGameActive) {
            document.addEventListener('keyup', onKeyUp);
            document.addEventListener('keydown', onKeyDown);
        }

        return () => {
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isGameActive]);

    const cells = useMemo(
        () =>
            currentBoard.map((row: number[], y: number) =>
                row.map((value, x) => {
                    const isHint =
                        y === hints.currentHint.y &&
                        x === hints.currentHint.x &&
                        !!hints.currentHint.value;
                    const isSelected = clickedCell.y === y && clickedCell.x === x;
                    const sameY = clickedCell.y === y;
                    const sameX = clickedCell.x === x;
                    const sameValue = clickedCell.value === value;
                    const digitClicked =
                        clickedCell.y === -1 &&
                        clickedCell.x === -1 &&
                        !!clickedCell.value;
                    const areaFinished =
                        !!value &&
                        (finishedAreas.rows[y] ||
                            finishedAreas.columns[x] ||
                            finishedAreas.boxes[getBoxIndex(y, x)]);
                    const cellState = deriveCellState(
                        isSelected,
                        sameY,
                        sameX,
                        sameValue,
                        digitClicked,
                        areaFinished,
                        isHint
                    );
                    const displayValue =
                        value || (isHint ? hints.currentHint.value : 0) || null;

                    return (
                        <BoardCell
                            cellState={cellState}
                            displayValue={displayValue}
                            isGameActive={isGameActive}
                            isSelected={isSelected}
                            key={`x:${x},y:${y}`}
                            value={value}
                            x={x}
                            y={y}
                        />
                    );
                })
            ),
        [clickedCell, currentBoard, finishedAreas, hints.currentHint, isGameActive]
    );

    return (
        <BasicGrid $columns={9} $rows={9}>
            {cells}
        </BasicGrid>
    );
};

export default BoardGrid;
