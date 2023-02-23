import { EGameStatus, TActionCreator, TActionMap } from '../types';
import { IDifficulties } from '../../types/types';

export enum EGameInfoActionTypes {
  SetGameStatus = 'SET_GAME_STATUS',
  SetDifficulty = 'SET_DIFFICULTY',
}

export type TGameInfoPayload = {
  [EGameInfoActionTypes.SetGameStatus]: EGameStatus;
  [EGameInfoActionTypes.SetDifficulty]: keyof IDifficulties | null;
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

export const setGameDifficulty: TGameInfoActionCreator<
  keyof IDifficulties | null
> = (payload) => ({
  type: EGameInfoActionTypes.SetDifficulty,
  payload,
});
