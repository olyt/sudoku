import React, { createContext, useContext, useReducer } from 'react';
import reducer from './mainReducer';
import { IState, TAction, TOperation } from './types';
import { context } from './state';

const AppContext = createContext<IState>({
  ...context,
  dispatch: () => null,
});

export const useAppContext: () => IState = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, context);
  const dispatchWithThunk = (action: TAction | TOperation): void => {
    if (typeof action === 'function') {
      action(state, dispatch);
    } else {
      dispatch(action);
    }
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch: dispatchWithThunk }}>
      {children}
    </AppContext.Provider>
  );
};
