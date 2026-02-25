/**
 * @description Central type definitions for the application state, actions, and dispatch.
 * Defines enums for game status and modal components, state shape interfaces,
 * and discriminated union action types.
 */

import React from 'react';
import { ICell, TBoard } from '../@types/global';
import { TBoardsAction } from './boards/actions';
import { TGameInfoAction } from './gameStatus/actions';
import { TModalAction } from './modal/actions';
import { TClickedCellAction } from './clickedCell/actions';
import { THistoryAction } from './history/actions';
import { THintsAction } from './hints/actions';

/** Possible states of the game lifecycle */
export enum EGameStatus {
    NotStarted = 'NOT_STARTED',
    InProgress = 'IN_PROGRESS',
    Failed = 'FAILED',
    Win = 'WIN',
}

/** Components that can be rendered inside the modal */
export enum EModalComponents {
    DifficultyBlock = 'DifficultyBlock',
    WinBanner = 'WinBanner',
    Empty = 'empty',
}

/** State slice for Sudoku boards: current player board, initial puzzle, and solution */
export type TBoardsState = {
    currentBoard: TBoard;
    initialBoard: TBoard;
    solution: TBoard;
};

export type TModalState = {
    isOpen: boolean;
    component: EModalComponents;
};

/** State slice for move history (used for undo functionality, capped at 5 entries) */
export type THistory = {
    cells: ICell[];
    error: boolean;
};

export type TGameInfoState = {
    gameStatus: EGameStatus;
};

/** State slice for hint system: remaining count, current hint cell, and error flag */
export type THints = {
    count: number;
    error: boolean;
    currentHint: ICell;
};

/** Complete application state shape, combining all state slices */
export interface IAppContext {
    clickedCell: ICell;
    boards: TBoardsState;
    modal: TModalState;
    gameStatus: EGameStatus;
    history: THistory;
    hints: THints;
}

/** Union of all possible action types across all reducers */
export type TAction =
    | TBoardsAction
    | TGameInfoAction
    | TModalAction
    | TClickedCellAction
    | THistoryAction
    | THintsAction
    | TOperation;

export type TDispatch = React.Dispatch<TAction>;

/** A thunk operation: a function receiving dispatch and state for complex/async logic */
export type TOperation = (
    dispatch: TDispatch,
    state: IAppContext
) => TAction | void;

export interface IState extends IAppContext {
    dispatch: TDispatch | ((action: TAction | TOperation) => void);
}

/** Generic action creator type: takes a payload and returns a typed action */
export type TActionCreator<T, M> = (payload: T) => M;

/**
 * Maps a payload type map to a discriminated union of action objects.
 * If the payload is undefined, the action has only a type field; otherwise it includes a payload.
 */
export type TActionMap<M extends { [index: string]: unknown }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};
