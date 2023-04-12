import React from 'react';
import { THistory } from '../types';
import { EHistoryActionTypes, THistoryAction } from './actions';

const reducer: React.Reducer<THistory, THistoryAction> = (state, action) => {
  switch (action.type) {
    case EHistoryActionTypes.PushToHistory:
      return {
        ...state,
        cells: [...state.cells, action.payload],
      };
    case EHistoryActionTypes.GoBack:
      return {
        ...state,
        currentIndex: state.currentIndex === 0 ? 0 : state.currentIndex - 1,
      };
    case EHistoryActionTypes.GoForward:
      return {
        ...state,
        currentIndex:
          state.currentIndex === state.cells.length - 1
            ? state.cells.length - 1
            : state.currentIndex + 1,
      };
    default:
      return state;
  }
};

export default reducer;
