import { TActionMap } from '../types';

export enum EHintsActionTypes {
  UseHint = 'UseHint',
  SetError = 'SetError',
}

export type THintsPayload = {
  [EHintsActionTypes.UseHint]: undefined;
  [EHintsActionTypes.SetError]: boolean;
};

export type THintsAction =
  TActionMap<THintsPayload>[keyof TActionMap<THintsPayload>];

export const useHint: THintsAction = {
  type: EHintsActionTypes.UseHint,
};

export const setError = (payload: boolean): THintsAction => ({
  type: EHintsActionTypes.SetError,
  payload,
});
