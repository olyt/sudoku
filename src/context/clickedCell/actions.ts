import { TActionCreator, TActionMap } from '../types';
import { ICell, ICellCoordinates } from '../../@types/global';

export enum EClickedCellActionTypes {
    SetClickedCell = 'SET_CLICKED_CELL',
    SetClickedCellValue = 'SET_CLICKED_CELL_VALUE',
    ResetClickedCell = 'RESET_CLICKED_CELL',
    SetClickedCellCoordinates = 'SET_CLICKED_CELL_COORDINATES',
}

export type TClickedCellPayload = {
    [EClickedCellActionTypes.SetClickedCell]: ICell;
    [EClickedCellActionTypes.SetClickedCellValue]: number;
    [EClickedCellActionTypes.ResetClickedCell]: undefined;
    [EClickedCellActionTypes.SetClickedCellCoordinates]: ICellCoordinates;
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

export const setClickedCell: TClickedCellActionCreator<ICell> = (payload) => ({
    type: EClickedCellActionTypes.SetClickedCell,
    payload,
});

export const setClickedCellCoordinates: TClickedCellActionCreator<
    ICellCoordinates
> = (payload) => ({
    type: EClickedCellActionTypes.SetClickedCellCoordinates,
    payload,
});
