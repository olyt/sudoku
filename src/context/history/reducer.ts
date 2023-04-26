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
          state.cells.length <= 9
            ? [...state.cells, action.payload]
            : [...state.cells.slice(1), action.payload],
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
    case EHistoryActionTypes.SetGoBackError:
      return {
        ...state,
        goBackError: action.payload,
      };
    case EHistoryActionTypes.SetGoForwardError:
      return {
        ...state,
        goForwardError: action.payload,
      };
    case EHistoryActionTypes.SetCurrentIndex:
      return {
        ...state,
        currentIndex: action.payload,
      };
    case EHistoryActionTypes.ResetHistory:
      return initialHistory;
    default:
      return state;
  }
};

export default reducer;
