import React from 'react';
import { EHintsActionTypes, THintsAction } from './actions';
import { THints } from '../types';

const reducer: React.Reducer<THints, THintsAction> = (state, action) => {
  switch (action.type) {
    case EHintsActionTypes.UseHint:
      return { ...state, count: state.count - 1 };
    case EHintsActionTypes.SetHintError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
