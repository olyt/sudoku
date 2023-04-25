import { EGameStatus, TOperation } from '../types';
import { goBack, goForward, setCurrentIndex } from './actions';
import { setClickedCell } from '../clickedCell/actions';

export enum EDirection {
  Back = 'Back',
  Forward = 'Forward',
}

export const tryToGoThroughHistory =
  (direction: EDirection): TOperation =>
  (dispatch, state) => {
    const {
      history: { currentIndex, cells },
      gameInfo: { gameStatus },
    } = state;
    const isFroward = direction === EDirection.Forward;

    if (
      (!currentIndex && !isFroward) ||
      (currentIndex === cells.length - 1 && isFroward) ||
      gameStatus === EGameStatus.NotStarted
    ) {
      return;
    }

    if (currentIndex === -1) {
      dispatch(setCurrentIndex(cells.length - 1));
      dispatch(setClickedCell(cells[cells.length - 1]));
      return;
    }

    const nextIndex = isFroward ? currentIndex + 1 : currentIndex - 1;

    dispatch(isFroward ? goForward() : goBack());
    dispatch(setClickedCell(cells[nextIndex]));
  };
