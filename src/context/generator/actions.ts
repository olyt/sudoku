import { EGeneratorType, TActionCreator, TActionMap } from '../types';

export enum EGeneratorActionTypes {
    SetGeneratorType = 'SET_GENERATOR_TYPE',
}

export type TGeneratorPayload = {
    [EGeneratorActionTypes.SetGeneratorType]: EGeneratorType;
};

export type TGeneratorAction =
    TActionMap<TGeneratorPayload>[keyof TActionMap<TGeneratorPayload>];

type TGeneratorActionCreator<T> = TActionCreator<T, TGeneratorAction>;

export const setGeneratorType: TGeneratorActionCreator<EGeneratorType> = (
    payload
) => ({
    type: EGeneratorActionTypes.SetGeneratorType,
    payload,
});
