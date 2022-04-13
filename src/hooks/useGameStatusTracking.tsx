import { useAppContext } from '../context/AppContext';
import {
  failGameStatus,
  setModal,
  setModalComponent,
  winGameStatus,
} from '../context/actions';
import { GameStatus, ModalComponents } from '../context/types';
import { useEffect } from 'react';

const useGameStatusTracking = (): void => {
  const {
    state: { currentBoard, solution, gameStatus },
    dispatch,
  } = useAppContext();

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

  const handleWin = (): void => {
    dispatch(setModalComponent(ModalComponents.WinBanner));
    dispatch(setModal(true));
  };

  useEffect(() => {
    switch (gameStatus) {
      case GameStatus.InProgress:
        checkInProgress();
        break;
      case GameStatus.Win:
        handleWin();
        break;
    }
  }, [currentBoard, dispatch, gameStatus, solution]);
};

export default useGameStatusTracking;
