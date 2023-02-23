import React from 'react';
import { TBoardsState } from '../types';
import { EBoardsActionTypes, TBoardsAction } from './actions';

const reducer: React.Reducer<TBoardsState, TBoardsAction> = (state, action) => {
  switch (action.type) {
    case EBoardsActionTypes.SetBoard:
      return {
        ...state,
        currentBoard: action.payload,
      };
    case EBoardsActionTypes.SetInitialBoard:
      return {
        ...state,
        initialBoard: action.payload,
      };
    case EBoardsActionTypes.SetSolution:
      return {
        ...state,
        solution: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
