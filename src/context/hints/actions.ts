import { TActionMap } from '../types';

export enum EHintsActionTypes {
  UseHint = 'UseHint',
  SetHintError = 'SetHintError',
}

export type THintsPayload = {
  [EHintsActionTypes.UseHint]: undefined;
  [EHintsActionTypes.SetHintError]: boolean;
};

export type THintsAction =
  TActionMap<THintsPayload>[keyof TActionMap<THintsPayload>];

export const useHint: THintsAction = {
  type: EHintsActionTypes.UseHint,
};

export const setError = (payload: boolean): THintsAction => ({
  type: EHintsActionTypes.SetHintError,
  payload,
});
