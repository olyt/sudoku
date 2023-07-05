import React from 'react';
import { EGameStatus } from '../types';
import { EGameInfoActionTypes, TGameInfoAction } from './actions';

const reducer: React.Reducer<EGameStatus, TGameInfoAction> = (
  state,
  action
) => {
  switch (action.type) {
    case EGameInfoActionTypes.SetGameStatus:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
