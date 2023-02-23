import React, { createContext, useContext, useReducer } from 'react';
import reducer from './mainReducer';
import { IState } from './types';
import { context } from './state';

const AppContext = createContext<IState>({
  ...context,
  dispatch: () => null,
});

export const useAppContext: () => IState = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, context);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
