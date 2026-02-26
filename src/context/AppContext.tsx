/**
 * @description Application-wide state management using React Context with thunk support.
 * Provides a Redux-like pattern: a combined reducer handles synchronous actions,
 * while thunk operations (functions) receive dispatch and state for async/complex flows.
 */

import React, { createContext, useCallback, useContext, useReducer, useRef } from 'react';
import reducer from './mainReducer';
import { IAppContext, IState, TAction, TOperation } from './types';
import { context } from './state';

const AppContext = createContext<IState>({
    ...context,
    dispatch: () => null,
});

/**
 * @function useAppContext
 * @description Hook to access the global application state and dispatch function
 * @returns {IState} - the full app state plus a dispatch function supporting both actions and thunks
 */
export const useAppContext = (): IState => useContext(AppContext);

/**
 * @function AppContextProvider
 * @description Context provider that wraps the app with global state management.
 * Enhances the standard useReducer dispatch to support thunk operations
 * (functions that receive dispatch and current state).
 * Uses a ref to always provide the latest state to thunks, avoiding stale closures.
 * @param {object} root0 - component props
 * @param {React.ReactNode} root0.children - child elements to render
 * @returns {JSX.Element} - the context provider wrapping children
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

    return (
        <AppContext.Provider value={{ ...state, dispatch: dispatchWithThunk }}>
            {children}
        </AppContext.Provider>
    );
};
