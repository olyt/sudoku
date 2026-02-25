/**
 * @description Root reducer that combines all feature reducers into a single state object.
 * Each action is passed to every sub-reducer; unrecognized actions return state unchanged.
 */

import { IAppContext, TAction } from './types';
import React from 'react';
import boardsReducer from './boards/reducer';
import gameStatusReducer from './gameStatus/reducer';
import modalReducer from './modal/reducer';
import clickedCellReducer from './clickedCell/reducer';
import historyReducer from './history/reducer';
import hintsReducer from './hints/reducer';
import { TBoardsAction } from './boards/actions';
import { TGameInfoAction } from './gameStatus/actions';
import { TModalAction } from './modal/actions';
import { TClickedCellAction } from './clickedCell/actions';
import { THistoryAction } from './history/actions';
import { THintsAction } from './hints/actions';

const mainReducer: React.Reducer<IAppContext, TAction> = (state, action) => ({
    boards: boardsReducer(state.boards, action as TBoardsAction),
    gameStatus: gameStatusReducer(state.gameStatus, action as TGameInfoAction),
    modal: modalReducer(state.modal, action as TModalAction),
    history: historyReducer(state.history, action as THistoryAction),
    hints: hintsReducer(state.hints, action as THintsAction),
    clickedCell: clickedCellReducer(
        state.clickedCell,
        action as TClickedCellAction
    ),
});

export default mainReducer;
