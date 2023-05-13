import { TActionMap } from '../types';
import { ICell } from '../../types/types';

export enum EHintsActionTypes {
  DecrementHint = 'DecrementHint',
  SetHintError = 'SetHintError',
  SetCurrentHint = 'SetCurrentHint',
  ResetCurrentHint = 'ResetCurrentHint',
}

export type THintsPayload = {
  [EHintsActionTypes.DecrementHint]: undefined;
  [EHintsActionTypes.ResetCurrentHint]: undefined;
  [EHintsActionTypes.SetHintError]: boolean;
  [EHintsActionTypes.SetCurrentHint]: ICell;
};

export type THintsAction =
  TActionMap<THintsPayload>[keyof TActionMap<THintsPayload>];

export const decrementHint: THintsAction = {
  type: EHintsActionTypes.DecrementHint,
};

export const setError = (payload: boolean): THintsAction => ({
  type: EHintsActionTypes.SetHintError,
  payload,
});

export const setCurrentHint = (payload: ICell): THintsAction => ({
  type: EHintsActionTypes.SetCurrentHint,
  payload,
});

export const resetCurrentHint: THintsAction = {
  type: EHintsActionTypes.ResetCurrentHint,
};
