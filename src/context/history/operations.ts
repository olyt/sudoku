import { TOperation } from '../types';
import { goForward, setCurrentIndex, setError } from './actions';
import { setClickedCell } from '../clickedCell/actions';

export const tryGoBack = (): TOperation => (dispatch, state) => {
  const {
    history: { currentIndex, cells },
  } = state;

  if (!currentIndex) {
    dispatch(setError(true));
    return;
  }

  if (currentIndex === -1) {
    dispatch(setCurrentIndex(cells.length - 1));
    dispatch(setClickedCell(cells[cells.length - 1]));
    return;
  }

  dispatch(goForward());
  dispatch(setClickedCell(cells[currentIndex - 1]));
};

export const tryGoForward = (): TOperation => (dispatch, state) => {
  const {
    history: { currentIndex, cells },
  } = state;

  if (currentIndex === cells.length - 1) {
    dispatch(setError(true));
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
