import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import { IAppContext, EGameStatus, EModalComponents, TState } from './types';
import { copyBlankBoard } from '../utils/boardHelper';

const context: IAppContext = {
  clickedCell: { y: -1, x: -1, value: 0 },
  currentBoard: copyBlankBoard(),
  initialBoard: copyBlankBoard(),
  solution: copyBlankBoard(),
  modal: {
    isOpen: false,
    component: EModalComponents.Empty,
  },
  gameStatus: EGameStatus.NotStarted,
};

const AppContext = createContext<TState>({
  state: context,
  dispatch: () => null,
});

export const useAppContext: () => TState = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, context);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
