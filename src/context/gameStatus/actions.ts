import { EGameStatus, TActionCreator, TActionMap } from '../types';

export enum EGameInfoActionTypes {
    SetGameStatus = 'SET_GAME_STATUS',
}

export type TGameInfoPayload = {
    [EGameInfoActionTypes.SetGameStatus]: EGameStatus;
};

export type TGameInfoAction =
    TActionMap<TGameInfoPayload>[keyof TActionMap<TGameInfoPayload>];

type TGameInfoActionCreator<T> = TActionCreator<T, TGameInfoAction>;

export const setGameStatus: TGameInfoActionCreator<EGameStatus> = (
    payload
) => ({
    type: EGameInfoActionTypes.SetGameStatus,
    payload,
});
