import React, { createContext, useContext, useReducer } from 'react';
import reducer from './mainReducer';
import { IAppContext, IState, TAction, TOperation } from './types';
import { context } from './state';

const AppContext = createContext<IState>({
  ...context,
  dispatch: () => null,
});

export const useAppContext = (): IState => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<React.Reducer<IAppContext, TAction>>(
    reducer,
    context
  );
  const dispatchWithThunk = (action: TAction | TOperation): TAction | void => {
    if (typeof action === 'function') {
      return action(dispatch, state);
    }

    return dispatch(action);
  };

  return (
    <AppContext.Provider value={{ ...state, dispatch: dispatchWithThunk }}>
      {children}
    </AppContext.Provider>
  );
};
