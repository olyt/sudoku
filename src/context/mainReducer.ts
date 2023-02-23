import { IAppContext, TAction } from './types';
import React from 'react';
import boardsReducer from './boards/reducer';
import gameInfoReducer from './gameInfo/reducer';
import modalReducer from './modal/reducer';
import clickedCellReducer from './clickedCell/reducer';
import { TBoardsAction } from './boards/actions';
import { TGameInfoAction } from './gameInfo/actions';
import { TModalAction } from './modal/actions';
import { TClickedCellAction } from './clickedCell/actions';

const mainReducer: React.Reducer<IAppContext, TAction> = (state, action) => ({
  boards: boardsReducer(state.boards, action as TBoardsAction),
  gameInfo: gameInfoReducer(state.gameInfo, action as TGameInfoAction),
  modal: modalReducer(state.modal, action as TModalAction),
  clickedCell: clickedCellReducer(
    state.clickedCell,
    action as TClickedCellAction
  ),
});

export default mainReducer;
