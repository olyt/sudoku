import { EGameStatus, TOperation } from '../types';
import { goBack, goForward, setCurrentIndex } from './actions';
import { setClickedCell } from '../clickedCell/actions';

export const tryGoBack = (): TOperation => (dispatch, state) => {
  const {
    history: { currentIndex, cells },
    gameInfo: { gameStatus },
  } = state;

  if (!currentIndex || gameStatus === EGameStatus.NotStarted) {
    return;
  }

  if (currentIndex === -1) {
    dispatch(setCurrentIndex(cells.length - 1));
    dispatch(setClickedCell(cells[cells.length - 1]));
    return;
  }

  dispatch(goBack());
  dispatch(setClickedCell(cells[currentIndex - 1]));
};

export const tryGoForward = (): TOperation => (dispatch, state) => {
  const {
    history: { currentIndex, cells },
    gameInfo: { gameStatus },
  } = state;

  if (
    currentIndex === cells.length - 1 ||
    gameStatus === EGameStatus.NotStarted
  ) {
    return;
  }

  if (currentIndex === -1) {
    dispatch(setCurrentIndex(cells.length - 1));
    dispatch(setClickedCell(cells[cells.length - 1]));
    return;
  }

  dispatch(goForward());
  dispatch(setClickedCell(cells[currentIndex + 1]));
};
