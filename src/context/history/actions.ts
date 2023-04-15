import { ICell } from '../../types/types';
import { TActionMap } from '../types';

export enum EHistoryActionTypes {
  PushToHistory = 'PushToHistory',
  GoBack = 'GoBack',
  GoForward = 'GoForward',
  SetError = 'SetError',
  SetCurrentIndex = 'SetCurrentIndex',
}

export type THistoryPayload = {
  [EHistoryActionTypes.PushToHistory]: ICell;
  [EHistoryActionTypes.GoBack]: undefined;
  [EHistoryActionTypes.GoForward]: undefined;
  [EHistoryActionTypes.SetError]: boolean;
  [EHistoryActionTypes.SetCurrentIndex]: number;
};

export type THistoryAction =
  TActionMap<THistoryPayload>[keyof TActionMap<THistoryPayload>];

export const pushToHistory = (payload: ICell): THistoryAction => ({
  type: EHistoryActionTypes.PushToHistory,
  payload,
});

export const goBack = (): THistoryAction => ({
  type: EHistoryActionTypes.GoBack,
});

export const goForward = (): THistoryAction => ({
  type: EHistoryActionTypes.GoForward,
});

export const setError = (payload: boolean): THistoryAction => ({
  type: EHistoryActionTypes.SetError,
  payload,
});

export const setCurrentIndex = (payload: number): THistoryAction => ({
  type: EHistoryActionTypes.SetCurrentIndex,
  payload,
});
