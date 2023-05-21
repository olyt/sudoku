import { EGameStatus, TOperation } from '../types';
import { suggestHint } from '../../utils/boardHelper';
import { decrementHint, setCurrentHint, setError } from './actions';

export const hint = (): TOperation => (dispatch, state) => {
  if (state.gameInfo.gameStatus !== EGameStatus.InProgress) {
    return;
  }

  if (!state.hints.count) {
    dispatch(setError(true));
    setTimeout(() => dispatch(setError(false)), 400);
    return;
  }

  const nextHint = suggestHint(
    state.boards.currentBoard,
    state.boards.solution
  );
  dispatch(decrementHint);
  dispatch(setCurrentHint(nextHint));
};
