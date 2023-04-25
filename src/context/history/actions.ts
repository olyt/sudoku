import { ICell } from '../../types/types';
import { TActionMap } from '../types';

export enum EHistoryActionTypes {
  PushToHistory = 'PushToHistory',
  GoBack = 'GoBack',
  GoForward = 'GoForward',
  SetGoBackError = 'SetGoBackError',
  SetGoForwardError = 'SetGoForwardError',
  SetCurrentIndex = 'SetCurrentIndex',
}

export type THistoryPayload = {
  [EHistoryActionTypes.PushToHistory]: ICell;
  [EHistoryActionTypes.GoBack]: undefined;
  [EHistoryActionTypes.GoForward]: undefined;
  [EHistoryActionTypes.SetGoBackError]: boolean;
  [EHistoryActionTypes.SetGoForwardError]: boolean;
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

export const setGoBackError = (payload: boolean): THistoryAction => ({
  type: EHistoryActionTypes.SetGoBackError,
  payload,
});

export const setGoForwardError = (payload: boolean): THistoryAction => ({
  type: EHistoryActionTypes.SetGoForwardError,
  payload,
});

export const setCurrentIndex = (payload: number): THistoryAction => ({
  type: EHistoryActionTypes.SetCurrentIndex,
  payload,
});
