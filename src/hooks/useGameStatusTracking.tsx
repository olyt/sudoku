/**
 * @description Hook that monitors the current board against the solution
 * to detect win and fail conditions. Triggers modal display on win
 * and updates game status on incorrect cell placement.
 */

import { useAppDispatch, useBoards, useGameStatus } from '../context/AppContext';
import { EGameStatus, EModalComponents } from '../context/types';
import { useEffect } from 'react';
import { setModalComponent, setModalIsOpen } from '../context/modal/actions';
import { setGameStatus } from '../context/gameStatus/actions';

/**
 * @function useGameStatusTracking
 * @description Tracks the game status by comparing the current board to the solution.
 * - When InProgress: checks for incorrect values (Failed) or complete match (Win).
 * - When Win: opens the win banner modal.
 */
const useGameStatusTracking = (): void => {
    const { currentBoard, solution } = useBoards();
    const gameStatus = useGameStatus();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleWin = (): void => {
            dispatch(setModalComponent(EModalComponents.WinBanner));
            dispatch(setModalIsOpen(true));
        };

        const checkInProgress = (): void => {
            let isFailed = false;

            const isWined = currentBoard.every((row, y) => {
                return row.every((value, x) => {
                    if (value && value !== solution[y][x]) {
                        isFailed = true;
                    }

                    return value ? value === solution[y][x] : false;
                });
            });

            if (isFailed) {
                dispatch(setGameStatus(EGameStatus.Failed));
            }

            if (isWined) {
                dispatch(setGameStatus(EGameStatus.Win));
            }
        };

        switch (gameStatus) {
            case EGameStatus.InProgress:
                checkInProgress();
                break;
            case EGameStatus.Win:
                handleWin();
                break;
        }
    }, [currentBoard, dispatch, gameStatus, solution]);
};

export default useGameStatusTracking;
