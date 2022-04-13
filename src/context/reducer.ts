import { Action, ActionTypes } from './actions';
import { AppContextInterface } from './types';
import React from 'react';

export const reducer: React.Reducer<AppContextInterface, Action> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionTypes.SetBoard:
      return {
        ...state,
        currentBoard: action.payload,
      };
    case ActionTypes.SetInitialBoard:
      return {
        ...state,
        initialBoard: action.payload,
      };
    case ActionTypes.SetSolution:
      return {
        ...state,
        solution: action.payload,
      };
    case ActionTypes.SetGameStatus:
      return {
        ...state,
        gameStatus: action.payload,
      };
    case ActionTypes.SetDifficulty:
      return { ...state, difficulty: action.payload };
    case ActionTypes.SetClickedCell:
      return { ...state, clickedCell: action.payload };
    case ActionTypes.SetClickedCellValue:
      return {
        ...state,
        clickedCell: { ...state.clickedCell, value: action.payload },
      };
    case ActionTypes.ResetClickedCell:
      return { ...state, clickedCell: { y: -1, x: -1, value: 0 } };
    case ActionTypes.SetModalOpen:
      return {
        ...state,
        modal: { ...state.modal, isOpen: action.payload },
      };
    case ActionTypes.SetModalComponent:
      return {
        ...state,
        modal: { ...state.modal, component: action.payload },
      };
    default:
      return state;
  }
};
