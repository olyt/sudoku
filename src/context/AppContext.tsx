import React, { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';
import {
  AppContextInterface,
  GameStatus,
  ModalComponents,
  State,
} from './types';
import { copyBlankBoard } from '../utils/boardHelper';

const context: AppContextInterface = {
  clickedCell: { y: -1, x: -1, value: 0 },
  currentBoard: copyBlankBoard(),
  initialBoard: copyBlankBoard(),
  solution: copyBlankBoard(),
  modal: {
    isOpen: false,
    component: ModalComponents.Empty,
  },
  gameStatus: GameStatus.NotStarted,
};

const AppContext = createContext<State>({
  state: context,
  dispatch: () => null,
});

export const useAppContext: () => State = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, context);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
