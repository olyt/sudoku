import { IAppContext, TAction } from './types';
import React from 'react';
import boardsReducer from './boards/reducer';
import gameInfoReducer from './gameInfo/reducer';
import modalReducer from './modal/reducer';
import clickedCellReducer from './clickedCell/reducer';
import historyReducer from './history/reducer';
import hintsReducer from './hints/reducer';
import { TBoardsAction } from './boards/actions';
import { TGameInfoAction } from './gameInfo/actions';
import { TModalAction } from './modal/actions';
import { TClickedCellAction } from './clickedCell/actions';
import { THistoryAction } from './history/actions';
import { THintsAction } from './hints/actions';

const mainReducer: React.Reducer<IAppContext, TAction> = (state, action) => ({
  boards: boardsReducer(state.boards, action as TBoardsAction),
  gameInfo: gameInfoReducer(state.gameInfo, action as TGameInfoAction),
  modal: modalReducer(state.modal, action as TModalAction),
  history: historyReducer(state.history, action as THistoryAction),
  hints: hintsReducer(state.hints, action as THintsAction),
  clickedCell: clickedCellReducer(
    state.clickedCell,
    action as TClickedCellAction
  ),
});
export default mainReducer;
