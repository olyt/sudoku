import React, { useEffect, useEffectEvent } from 'react';
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
    const [arrowUp, , , arrowLeft] = arrows;

    if (arrowUp === direction || arrowLeft === direction) {
        return oldCoordinate === 0 ? 8 : oldCoordinate - 1;
    }

    return oldCoordinate === 8 ? 0 : oldCoordinate + 1;
};

const BoardGrid: React.FC = () => {
    const currentBoard = useCurrentBoard();
    const clickedCell = useClickedCell();
    const hints = useHints();
    const isGameActive = useIsGameActive();
    const dispatch = useAppDispatch();
    const digitHandlerCreator = useCellValueHandler() as THandlerCreator;
    const finishedAreas = getFinishedAreas(currentBoard);

    const onKeyUp = useEffectEvent((event: KeyboardEvent) => {
        const { code } = event;

        if (code === escape) {
            dispatch(resetClickedCell);
        }

        const newValue = digits[code] || numpadDigits[code] || 0;

        if (newValue) {
            digitHandlerCreator<undefined>(newValue)();
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

        const [arrowUp, , arrowDown] = arrows;
        const { y, x } = clickedCell;
        const isVertical = code === arrowUp || code === arrowDown;
        const newY = isVertical ? calculateNewCoordinate(y, code) : y;
        const newX = isVertical ? x : calculateNewCoordinate(x, code);

        dispatch(
            setClickedCell({
                y: newY,
                x: newX,
                value: currentBoard[newY][newX],
            })
        );
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

    const cells = currentBoard.map((row: number[], y: number) =>
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
    );

    return (
        <BasicGrid $columns={9} $rows={9}>
            {cells}
        </BasicGrid>
    );
};

export default BoardGrid;
