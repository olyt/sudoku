import { TOperation } from '../types';
import { suggestHint } from '../../utils/boardHelper';
import { setClickedCell } from '../clickedCell/actions';
import { setError, useHint } from './actions';

export const hint = (): TOperation => (dispatch, state) => {
  if (!state.hints.count) {
    dispatch(setError(true));
    setTimeout(() => dispatch(setError(false)), 400);
    return;
  }

  const nextHint = suggestHint(
    state.boards.currentBoard,
    state.boards.solution
  );
  dispatch(useHint);
  dispatch(setClickedCell(nextHint));
};
