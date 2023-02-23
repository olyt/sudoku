import React from 'react';
import { EClickedCellActionTypes, TClickedCellAction } from './actions';
import { initialClickedCell } from '../state';
import { TCell } from '../../types/types';

const reducer: React.Reducer<TCell, TClickedCellAction> = (state, action) => {
  switch (action.type) {
    case EClickedCellActionTypes.ResetClickedCell:
      return initialClickedCell;
    case EClickedCellActionTypes.SetClickedCell:
      return action.payload;
    case EClickedCellActionTypes.SetClickedCellValue:
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
