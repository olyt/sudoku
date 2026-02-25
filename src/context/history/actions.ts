import { ICell } from '../../@types/global';
import { TActionMap } from '../types';

export enum EHistoryActionTypes {
    PushToHistory = 'PushToHistory',
    Undo = 'Undo',
    SetHistoryError = 'SetHistoryError',
    ResetHistory = 'ResetHistory',
}

export type THistoryPayload = {
    [EHistoryActionTypes.PushToHistory]: ICell;
    [EHistoryActionTypes.Undo]: undefined;
    [EHistoryActionTypes.ResetHistory]: undefined;
    [EHistoryActionTypes.SetHistoryError]: boolean;
};

export type THistoryAction =
    TActionMap<THistoryPayload>[keyof TActionMap<THistoryPayload>];

export const pushToHistory = (payload: ICell): THistoryAction => ({
    type: EHistoryActionTypes.PushToHistory,
    payload,
});

export const undo: THistoryAction = {
    type: EHistoryActionTypes.Undo,
};

export const resetHistory: THistoryAction = {
    type: EHistoryActionTypes.ResetHistory,
};

export const setError = (payload: boolean): THistoryAction => ({
    type: EHistoryActionTypes.SetHistoryError,
    payload,
});
