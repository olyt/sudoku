import React, { useCallback, useEffect } from 'react';
import BoardCell from '../Cells/BoardCell';
import { useAppDispatch, useBoards, useClickedCell, useGameStatus } from '../../context/AppContext';
import { arrows, digits, escape, numpadDigits } from '../../constants/keyboard';
import {
    resetClickedCell,
    setClickedCell,
    setClickedCellCoordinates,
} from '../../context/clickedCell/actions';
import { EGameStatus } from '../../context/types';
import BasicGrid from './BasicGrid';
import useCellValueHandler, {
    THandlerCreator,
} from '../../hooks/useCellValueHandler';

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
    const boards = useBoards();
    const clickedCell = useClickedCell();
    const gameStatus = useGameStatus();
    const dispatch = useAppDispatch();
    const digitHandlerCreator = useCellValueHandler() as THandlerCreator;

    const handleDigits = useCallback(
        (code: string) => {
            const newValue = digits[code] || numpadDigits[code] || 0;

            if (newValue) {
                digitHandlerCreator<undefined>(newValue)();
            }
        },
        [digitHandlerCreator]
    );

    const handleArrows = useCallback(
        (code: string) => {
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
                            value: boards.currentBoard[newY][x],
                        })
                    );
                    break;
                case arrowRight:
                    dispatch(
                        setClickedCell({
                            y,
                            x: newX,
                            value: boards.currentBoard[y][newX],
                        })
                    );
                    break;
                case arrowDown:
                    dispatch(
                        setClickedCell({
                            y: newY,
                            x,
                            value: boards.currentBoard[newY][x],
                        })
                    );
                    break;
                case arrowLeft:
                    dispatch(
                        setClickedCell({
                            y,
                            x: newX,
                            value: boards.currentBoard[y][newX],
                        })
                    );
                    break;
                default:
                    break;
            }
        },
        [clickedCell, dispatch, boards.currentBoard]
    );

    const onKeyUp = useCallback(
        (event: KeyboardEvent) => {
            const { code } = event;

            if (code === escape) {
                dispatch(resetClickedCell);
            }

            if (
                [...Object.keys(digits), ...Object.keys(numpadDigits)].includes(
                    code
                )
            ) {
                handleDigits(code);
            }
        },
        [dispatch, handleDigits]
    );

    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (arrows.includes(event.code)) {
                handleArrows(event.code);
            }
        },
        [handleArrows]
    );

    useEffect(() => {
        if (gameStatus !== EGameStatus.NotStarted) {
            document.addEventListener('keyup', onKeyUp);
            document.addEventListener('keydown', onKeyDown);
        }

        return () => {
            document.removeEventListener('keyup', onKeyUp);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [gameStatus, onKeyUp, onKeyDown]);

    const cells = boards.currentBoard.map((row: number[], y: number) =>
        row.map((num, x) => (
            <BoardCell value={num} x={x} y={y} key={`x:${x},y:${y}`} />
        ))
    );

    return (
        <BasicGrid columns={9} rows={9}>
            {cells}
        </BasicGrid>
    );
};

export default BoardGrid;
