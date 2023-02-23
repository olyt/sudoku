import { useAppContext } from '../context/AppContext';
import { EGameStatus, EModalComponents } from '../context/types';
import { useEffect } from 'react';
import { setModalComponent, setModalIsOpen } from '../context/modal/actions';
import { setGameStatus } from '../context/gameInfo/actions';

const useGameStatusTracking = (): void => {
  const {
    boards: { currentBoard, solution },
    gameInfo: { gameStatus },
    dispatch,
  } = useAppContext();

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
