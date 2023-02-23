import { TActionCreator, TActionMap } from '../types';
import { TCell } from '../../types/types';

export enum EClickedCellActionTypes {
  SetClickedCell = 'SET_CLICKED_CELL',
  SetClickedCellValue = 'SET_CLICKED_CELL_VALUE',
  ResetClickedCell = 'RESET_CLICKED_CELL',
}

export type TClickedCellPayload = {
  [EClickedCellActionTypes.SetClickedCell]: TCell;
  [EClickedCellActionTypes.SetClickedCellValue]: number;
  [EClickedCellActionTypes.ResetClickedCell]: undefined;
};

export type TClickedCellAction =
  TActionMap<TClickedCellPayload>[keyof TActionMap<TClickedCellPayload>];

type TClickedCellActionCreator<T> = TActionCreator<T, TClickedCellAction>;

export const setClickedCellValue: TClickedCellActionCreator<number> = (
  payload
) => ({
  type: EClickedCellActionTypes.SetClickedCellValue,
  payload,
});

export const resetClickedCell: TClickedCellAction = {
  type: EClickedCellActionTypes.ResetClickedCell,
};

export const setClickedCell: TClickedCellActionCreator<TCell> = (payload) => ({
  type: EClickedCellActionTypes.SetClickedCell,
  payload,
});
