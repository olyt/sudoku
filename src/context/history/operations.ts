import { EGameStatus, TOperation } from '../types';
import {
  goBack,
  goForward,
  setCurrentIndex,
  setGoBackError,
  setGoForwardError,
} from './actions';
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
    const isForward = direction === EDirection.Forward;

    if (gameStatus === EGameStatus.NotStarted) {
      return;
    }

    if (
      (!currentIndex && !isForward) ||
      (currentIndex === cells.length - 1 && isForward)
    ) {
      dispatch(isForward ? setGoForwardError(true) : setGoBackError(true));
      setTimeout(
        () =>
          dispatch(
            isForward ? setGoForwardError(false) : setGoBackError(false)
          ),
        400
      );
      return;
    }

    if (currentIndex === -1) {
      dispatch(setCurrentIndex(cells.length - 1));
      dispatch(setClickedCell(cells[cells.length - 1]));
      return;
    }

    const nextIndex = isForward ? currentIndex + 1 : currentIndex - 1;

    dispatch(isForward ? goForward() : goBack());
    dispatch(setClickedCell(cells[nextIndex]));
  };
