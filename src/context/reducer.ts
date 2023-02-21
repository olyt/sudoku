import { TAction, EActionTypes } from './actions';
import { IAppContext } from './types';
import React from 'react';

export const reducer: React.Reducer<IAppContext, TAction> = (state, action) => {
  switch (action.type) {
    case EActionTypes.SetBoard:
      return {
        ...state,
        currentBoard: action.payload,
      };
    case EActionTypes.SetInitialBoard:
      return {
        ...state,
        initialBoard: action.payload,
      };
    case EActionTypes.SetSolution:
      return {
        ...state,
        solution: action.payload,
      };
    case EActionTypes.SetGameStatus:
      return {
        ...state,
        gameStatus: action.payload,
      };
    case EActionTypes.SetDifficulty:
      return { ...state, difficulty: action.payload };
    case EActionTypes.SetClickedCell:
      return { ...state, clickedCell: action.payload };
    case EActionTypes.SetClickedCellValue:
      return {
        ...state,
        clickedCell: { ...state.clickedCell, value: action.payload },
      };
    case EActionTypes.ResetClickedCell:
      return { ...state, clickedCell: { y: -1, x: -1, value: 0 } };
    case EActionTypes.SetModalOpen:
      return {
        ...state,
        modal: { ...state.modal, isOpen: action.payload },
      };
    case EActionTypes.SetModalComponent:
      return {
        ...state,
        modal: { ...state.modal, component: action.payload },
      };
    default:
      return state;
  }
};
