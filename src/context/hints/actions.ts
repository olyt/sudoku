import { TActionMap } from '../types';

export enum EHintsActionTypes {
  UseHint = 'UseHint',
}

export type THintsPayload = {
  [EHintsActionTypes.UseHint]: undefined;
};

export type THintsAction =
  TActionMap<THintsPayload>[keyof TActionMap<THintsPayload>];

export const useHint: THintsAction = {
  type: EHintsActionTypes.UseHint,
};
