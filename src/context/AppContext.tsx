/**
 * @description Application-wide state management using React Context with thunk support.
 * State is split into independent slice contexts to minimise unnecessary re-renders:
 * each component subscribes only to the slices it needs via focused hooks.
 */

import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';
import reducer from './mainReducer';
import { EGameStatus, IAppContext, IState, TAction, TBoardsState, THints, THistory, TModalState, TOperation } from './types';
import { context } from './state';

const DispatchContext = createContext<IState['dispatch']>(() => null);

/**
 * @function useAppDispatch
 * @description Hook to access the stable dispatch function without subscribing to state changes.
 * Use in components that only dispatch actions and never read state.
 * @returns {IState['dispatch']} - the dispatch function supporting both actions and thunks
 */
export const useAppDispatch = (): IState['dispatch'] => useContext(DispatchContext);

const BoardsContext      = createContext<TBoardsState>(context.boards);
const GameStatusContext  = createContext<EGameStatus>(context.gameStatus);
const ModalContext       = createContext<TModalState>(context.modal);
const HistoryContext     = createContext<THistory>(context.history);
const HintsContext       = createContext<THints>(context.hints);
const ClickedCellContext = createContext<ICell>(context.clickedCell);

/**
 * @function useBoards
 * @description Subscribes to the boards slice: currentBoard, initialBoard, solution.
 * @returns {TBoardsState} - the boards state slice
 */
export const useBoards = (): TBoardsState => useContext(BoardsContext);

/**
 * @function useGameStatus
 * @description Subscribes to the game status primitive. React bails out on unchanged values.
 * @returns {EGameStatus} - the current game status
 */
export const useGameStatus = (): EGameStatus => useContext(GameStatusContext);

/**
 * @function useModal
 * @description Subscribes to the modal slice: isOpen flag and active component name.
 * @returns {TModalState} - the modal state slice
 */
export const useModal = (): TModalState => useContext(ModalContext);

/**
 * @function useHistory
 * @description Subscribes to the history slice used for undo functionality.
 * @returns {THistory} - the history state slice
 */
export const useHistory = (): THistory => useContext(HistoryContext);

/**
 * @function useHints
 * @description Subscribes to the hints slice: remaining count, current hint, and error flag.
 * @returns {THints} - the hints state slice
 */
export const useHints = (): THints => useContext(HintsContext);

/**
 * @function useClickedCell
 * @description Subscribes to the clicked cell: coordinates and value of the selected cell.
 * @returns {ICell} - the clicked cell state
 */
export const useClickedCell = (): ICell => useContext(ClickedCellContext);

/**
 * @function AppContextProvider
 * @description Wraps the app with all context providers.
 * A single reducer drives all state updates; useMemo on each slice ensures
 * a provider only propagates when its own reference changes.
 * @param {object} root0 - component props
 * @param {React.ReactNode} root0.children - child elements to render
 * @returns {JSX.Element} - the nested context providers wrapping children
 */
export const AppContextProvider: React.FC = ({ children }) => {
    const [state, baseDispatch] = useReducer<React.Reducer<IAppContext, TAction>>(
        reducer,
        context
    );
    const stateRef = useRef(state);

    stateRef.current = state;

    const dispatchWithThunk = useCallback((action: TAction | TOperation): TAction | void => {
        if (typeof action === 'function') {
            return action(baseDispatch, stateRef.current);
        }

        return baseDispatch(action);
    }, []);

    const boards      = useMemo(() => state.boards, [state.boards]);
    const modal       = useMemo(() => state.modal, [state.modal]);
    const history     = useMemo(() => state.history, [state.history]);
    const hints       = useMemo(() => state.hints, [state.hints]);
    const clickedCell = useMemo(() => state.clickedCell, [state.clickedCell]);

    return (
        <DispatchContext.Provider value={dispatchWithThunk}>
            <BoardsContext.Provider value={boards}>
                <GameStatusContext.Provider value={state.gameStatus}>
                    <ModalContext.Provider value={modal}>
                        <HistoryContext.Provider value={history}>
                            <HintsContext.Provider value={hints}>
                                <ClickedCellContext.Provider value={clickedCell}>
                                    {children}
                                </ClickedCellContext.Provider>
                            </HintsContext.Provider>
                        </HistoryContext.Provider>
                    </ModalContext.Provider>
                </GameStatusContext.Provider>
            </BoardsContext.Provider>
        </DispatchContext.Provider>
    );
};
