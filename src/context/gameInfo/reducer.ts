import React from 'react';
import { TGameInfoState } from '../types';
import { EGameInfoActionTypes, TGameInfoAction } from './actions';

const reducer: React.Reducer<TGameInfoState, TGameInfoAction> = (
  state,
  action
) => {
  switch (action.type) {
    case EGameInfoActionTypes.SetGameStatus:
      return {
        ...state,
        gameStatus: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
