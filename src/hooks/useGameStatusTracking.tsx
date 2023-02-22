import { useAppContext } from '../context/AppContext';
import {
  failGameStatus,
  setModal,
  setModalComponent,
  winGameStatus,
} from '../context/actions';
import { EGameStatus, EModalComponents } from '../context/types';
import { useEffect } from 'react';

const useGameStatusTracking = (): void => {
  const {
    state: { currentBoard, solution, gameStatus },
    dispatch,
  } = useAppContext();

  useEffect(() => {
    const handleWin = (): void => {
      dispatch(setModalComponent(EModalComponents.WinBanner));
      dispatch(setModal(true));
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
        dispatch(failGameStatus);
      }

      if (isWined) {
        dispatch(winGameStatus);
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
