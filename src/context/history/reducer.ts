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
        currentIndex: state.currentIndex - 1,
      };
    case EHistoryActionTypes.GoForward:
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
      };
    case EHistoryActionTypes.SetError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
