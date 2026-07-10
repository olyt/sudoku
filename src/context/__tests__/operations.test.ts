import { describe, it, expect, vi, beforeEach } from 'vitest';
import { startGame, resetGame, leaveAfterWin, startNewAfterWin, setValueToBoard } from '../operations';
import {
    EGameStatus,
    EGeneratorType,
    EModalComponents,
    IAppContext,
    TDispatch,
} from '../types';
import { EBoardsActionTypes } from '../boards/actions';
import { EGameInfoActionTypes } from '../gameStatus/actions';
import { EClickedCellActionTypes } from '../clickedCell/actions';
import { EHistoryActionTypes } from '../history/actions';
import { EHintsActionTypes } from '../hints/actions';
import { EModalActionTypes } from '../modal/actions';
import { defaultCell, initialHistory, initialHints } from '../state';

vi.mock('../../utils/generateBoard', () => ({
    generateBoard: vi.fn(() => {
        const board: TBoard = Array.from({ length: 9 }, (_, i) =>
            Array.from({ length: 9 }, (__, j) => i * 9 + j + 1)
        );
        const solution: TBoard = Array.from({ length: 9 }, (_, i) =>
            Array.from({ length: 9 }, (__, j) => (i * 9 + j + 1) % 9 + 1)
        );

        return [board, solution];
    }),
}));

vi.mock('../../utils/generators/symmetricGenerator', () => ({
    generateSymmetricBoard: vi.fn(() => {
        const board: TBoard = Array.from({ length: 9 }, () => Array<number>(9).fill(1));
        const solution: TBoard = Array.from({ length: 9 }, () => Array<number>(9).fill(2));

        return [board, solution];
    }),
}));

vi.mock('../../utils/generators/isomorphicGenerator', () => ({
    generateIsomorphicBoard: vi.fn(() => {
        const board: TBoard = Array.from({ length: 9 }, () => Array<number>(9).fill(3));
        const solution: TBoard = Array.from({ length: 9 }, () => Array<number>(9).fill(4));

        return [board, solution];
    }),
}));

vi.mock('../../utils/generators/technique', () => ({
    generateTechniqueBoard: vi.fn(() => {
        const board: TBoard = Array.from({ length: 9 }, () => Array<number>(9).fill(5));
        const solution: TBoard = Array.from({ length: 9 }, () => Array<number>(9).fill(6));

        return [board, solution];
    }),
}));

const blankBoard = (): TBoard => Array.from({ length: 9 }, () => Array<number>(9).fill(0));

const makeState = (overrides: Partial<IAppContext> = {}): IAppContext => ({
    clickedCell: defaultCell,
    boards: {
        currentBoard: blankBoard(),
        initialBoard: blankBoard(),
        solution: blankBoard(),
    },
    modal: { isOpen: false, component: EModalComponents.Empty },
    gameStatus: EGameStatus.NotStarted,
    history: initialHistory,
    hints: initialHints,
    generatorType: EGeneratorType.Standard,
    ...overrides,
});

describe('startGame', () => {
    it('dispatches 7 actions in order', () => {
        const dispatch = vi.fn<TDispatch>();
        const state = makeState();

        startGame('easy')(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(7);

        const types = dispatch.mock.calls.map((c) =>
            typeof c[0] === 'object' && 'type' in c[0] ? c[0].type : 'fn'
        );

        expect(types[0]).toBe(EBoardsActionTypes.SetInitialBoard);
        expect(types[1]).toBe(EBoardsActionTypes.SetBoard);
        expect(types[2]).toBe(EBoardsActionTypes.SetSolution);
        expect(dispatch.mock.calls[3][0]).toEqual({
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.InProgress,
        });
        expect(types[4]).toBe(EClickedCellActionTypes.ResetClickedCell);
        expect(types[5]).toBe(EHistoryActionTypes.ResetHistory);
        expect(types[6]).toBe(EHintsActionTypes.ResetHints);
    });
});

describe('resetGame', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('when gameStatus = Failed, dispatches board reset + resetHistory + resetHints + setGameStatus(InProgress)', () => {
        const dispatch = vi.fn<TDispatch>();
        const state = makeState({ gameStatus: EGameStatus.Failed });

        resetGame()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(4);

        const types = dispatch.mock.calls.map((c) =>
            typeof c[0] === 'object' && 'type' in c[0] ? c[0].type : 'fn'
        );

        expect(types[0]).toBe(EBoardsActionTypes.SetBoard);
        expect(types[1]).toBe(EHistoryActionTypes.ResetHistory);
        expect(types[2]).toBe(EHintsActionTypes.ResetHints);
        expect(dispatch.mock.calls[3][0]).toEqual({
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.InProgress,
        });
    });

    it('when gameStatus = InProgress, does NOT dispatch setGameStatus', () => {
        const dispatch = vi.fn<TDispatch>();
        const state = makeState({ gameStatus: EGameStatus.InProgress });

        resetGame()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(3);

        const types = dispatch.mock.calls.map((c) =>
            typeof c[0] === 'object' && 'type' in c[0] ? c[0].type : 'fn'
        );

        expect(types).not.toContain(EGameInfoActionTypes.SetGameStatus);
    });
});

describe('leaveAfterWin', () => {
    it('dispatches 7 actions ending with setGameStatus(NotStarted)', () => {
        const dispatch = vi.fn<TDispatch>();
        const state = makeState({ gameStatus: EGameStatus.Win });

        leaveAfterWin()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(7);

        expect(dispatch.mock.calls[6][0]).toEqual({
            type: EGameInfoActionTypes.SetGameStatus,
            payload: EGameStatus.NotStarted,
        });
    });
});

describe('startNewAfterWin', () => {
    it('dispatches setModalComponent(DifficultyBlock) only', () => {
        const dispatch = vi.fn<TDispatch>();
        const state = makeState({ gameStatus: EGameStatus.Win });

        startNewAfterWin()(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: EModalActionTypes.SetModalComponent,
            payload: EModalComponents.DifficultyBlock,
        });
    });
});

describe('startGame with Symmetric generator', () => {
    it('calls generateSymmetricBoard when generatorType is Symmetric', async () => {
        const { generateSymmetricBoard } = await import('../../utils/generators/symmetricGenerator');
        const dispatch = vi.fn<TDispatch>();
        const state = makeState({ generatorType: EGeneratorType.Symmetric });

        startGame('easy')(dispatch, state);

        expect(generateSymmetricBoard).toHaveBeenCalledWith('easy');
    });
});

describe('setValueToBoard', () => {
    it('dispatches setBoard, setClickedCellValue, and pushToHistory', () => {
        const dispatch = vi.fn<TDispatch>();
        const clickedCell: ICell = { y: 1, x: 2, value: 0 };
        const state = makeState({
            gameStatus: EGameStatus.InProgress,
            clickedCell,
        });

        setValueToBoard(5)(dispatch, state);

        expect(dispatch).toHaveBeenCalledTimes(3);

        const types = dispatch.mock.calls.map((c) =>
            typeof c[0] === 'object' && 'type' in c[0] ? c[0].type : 'fn'
        );

        expect(types[0]).toBe(EBoardsActionTypes.SetBoard);
        expect(dispatch.mock.calls[1][0]).toEqual({
            type: EClickedCellActionTypes.SetClickedCellValue,
            payload: 5,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: EHistoryActionTypes.PushToHistory,
            payload: { ...clickedCell, value: 5 },
        });
    });
});
