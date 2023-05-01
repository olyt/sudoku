import React from 'react';
import { EHintsActionTypes, THintsAction } from './actions';

const reducer: React.Reducer<number, THintsAction> = (state, action) => {
  switch (action.type) {
    case EHintsActionTypes.UseHint:
      return state - 1;
    default:
      return state;
  }
};

export default reducer;
