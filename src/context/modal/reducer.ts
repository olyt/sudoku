import React from 'react';
import { EModalActionTypes, TModalAction } from './actions';
import { TModalState } from '../types';

const reducer: React.Reducer<TModalState, TModalAction> = (state, action) => {
  switch (action.type) {
    case EModalActionTypes.SetModalOpen:
      return {
        ...state,
        isOpen: action.payload,
      };
    case EModalActionTypes.SetModalComponent:
      return {
        ...state,
        component: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
