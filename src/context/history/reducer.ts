import React from 'react';
import { THistory } from '../types';
import { EHistoryActionTypes, THistoryAction } from './actions';
import { initialHistory } from '../state';

const reducer: React.Reducer<THistory, THistoryAction> = (state, action) => {
  switch (action.type) {
    case EHistoryActionTypes.PushToHistory:
      return {
        ...state,
        cells:
          state.cells.length <= 4
            ? [...state.cells, action.payload]
            : [...state.cells.slice(1), action.payload],
      };
    case EHistoryActionTypes.Undo:
      return {
        ...state,
        cells: state.cells.slice(0, state.cells.length - 1),
      };
    case EHistoryActionTypes.SetHistoryError:
      return {
        ...state,
        error: action.payload,
      };
    case EHistoryActionTypes.ResetHistory:
      return initialHistory;
    default:
      return state;
  }
};

export default reducer;
