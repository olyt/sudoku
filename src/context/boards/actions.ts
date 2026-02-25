import { TActionCreator, TActionMap } from '../types';
import { copyBoard } from '../../utils/boardHelper';

export enum EBoardsActionTypes {
    SetBoard = 'SET_BOARD',
    SetInitialBoard = 'SET_INITIAL_BOARD',
    SetSolution = 'SET_SOLUTION',
}

export type TBoardsPayload = {
    [EBoardsActionTypes.SetBoard]: TBoard;
    [EBoardsActionTypes.SetInitialBoard]: TBoard;
    [EBoardsActionTypes.SetSolution]: TBoard;
};

export type TBoardsAction =
    TActionMap<TBoardsPayload>[keyof TActionMap<TBoardsPayload>];

type TBoardsActionCreator = TActionCreator<TBoard, TBoardsAction>;

export const setBoard: TBoardsActionCreator = (board) => ({
    type: EBoardsActionTypes.SetBoard,
    payload: board,
});

export const setBoardToInitial: TBoardsActionCreator = (payload) => ({
    type: EBoardsActionTypes.SetBoard,
    payload: copyBoard(payload),
});

export const setSolution: TBoardsActionCreator = (board) => ({
    type: EBoardsActionTypes.SetSolution,
    payload: board,
});

export const setInitialBoard: TBoardsActionCreator = (board) => ({
    type: EBoardsActionTypes.SetInitialBoard,
    payload: board,
});
