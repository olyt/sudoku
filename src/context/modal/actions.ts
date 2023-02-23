import { EModalComponents, TActionCreator, TActionMap } from '../types';

export enum EModalActionTypes {
  SetModalOpen = 'SET_MODAL_OPEN',
  SetModalComponent = 'SET_MODAL_COMPONENT',
}

export type TModalPayload = {
  [EModalActionTypes.SetModalOpen]: boolean;
  [EModalActionTypes.SetModalComponent]: EModalComponents;
};

export type TModalAction =
  TActionMap<TModalPayload>[keyof TActionMap<TModalPayload>];

type TModalActionCreator<T> = TActionCreator<T, TModalAction>;

export const setModalIsOpen: TModalActionCreator<boolean> = (payload) => ({
  type: EModalActionTypes.SetModalOpen,
  payload,
});

export const setModalComponent: TModalActionCreator<EModalComponents> = (
  payload
) => ({
  type: EModalActionTypes.SetModalComponent,
  payload,
});
