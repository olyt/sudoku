import { ICell } from '../../types/types';
import { TActionCreator, TActionMap } from '../types';

export enum EHistoryActionTypes {
  PushToHistory = 'PushToHistory',
  GoBack = 'GoBack',
  GoForward = 'GoForward',
}

export type THistoryPayload = {
  [EHistoryActionTypes.PushToHistory]: ICell;
  [EHistoryActionTypes.GoBack]: undefined;
  [EHistoryActionTypes.GoForward]: undefined;
};

export type THistoryAction =
  TActionMap<THistoryPayload>[keyof TActionMap<THistoryPayload>];

type THistoryActionCreator<T> = TActionCreator<T, THistoryAction>;

export const pushToHistory: THistoryActionCreator<ICell> = (payload) => ({
  type: EHistoryActionTypes.PushToHistory,
  payload,
});

export const goBack: THistoryActionCreator<undefined> = () => ({
  type: EHistoryActionTypes.GoBack,
});

export const goForward: THistoryActionCreator<undefined> = () => ({
  type: EHistoryActionTypes.GoForward,
});
