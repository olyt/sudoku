import { EGameStatus, TOperation } from '../types';
import { suggestHint } from '../../utils/boardHelper';
import { decrementHint, setCurrentHint, setError } from './actions';

/**
 * @function hint
 * @description Requests a hint for the player. Only works during an active game.
 * If no hints remain, triggers a temporary error animation.
 * Otherwise, suggests a cell from the least-filled row and decrements the counter.
 */
export const hint = (): TOperation => (dispatch, state) => {
    if (state.gameStatus !== EGameStatus.InProgress) {
        return;
    }

    if (!state.hints.count) {
        dispatch(setError(true));
        return;
    }

    const nextHint = suggestHint(
        state.boards.currentBoard,
        state.boards.solution
    );
    dispatch(decrementHint);
    dispatch(setCurrentHint(nextHint));
};
