import { TOperation } from '../types';
import { suggestHint } from '../../utils/boardHelper';
import { setClickedCell } from '../clickedCell/actions';
import { useHint } from './actions';

export const hint = (): TOperation => (dispatch, state) => {
  if (state.hints) {
    const nextHint = suggestHint(
      state.boards.currentBoard,
      state.boards.solution
    );
    dispatch(useHint);
    dispatch(setClickedCell(nextHint));
  }
};
