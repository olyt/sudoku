import React, { MouseEventHandler } from 'react';
import HeaderButton from '../HeaderButton';
import { useAppContext } from '../../../context/AppContext';
import {
  setModalComponent,
  setModalIsOpen,
} from '../../../context/modal/actions';
import { EGameStatus, EModalComponents } from '../../../context/types';
import { setBoard } from '../../../context/boards/actions';
import { resetHistory } from '../../../context/history/actions';
import { setGameStatus } from '../../../context/gameInfo/actions';
import { resetHints } from '../../../context/hints/actions';

const GameControlButtons: React.FC = () => {
  const { boards, gameInfo, dispatch } = useAppContext();

  const startNewGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setModalComponent(EModalComponents.DifficultyBlock));
    dispatch(setModalIsOpen(true));
  };

  const resetGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setBoard(boards.initialBoard));
    dispatch(resetHistory);
    dispatch(resetHints);

    if (gameInfo.gameStatus === EGameStatus.Failed) {
      dispatch(setGameStatus(EGameStatus.InProgress));
    }
  };

  return (
    <>
      <HeaderButton onClick={startNewGame}>New Game</HeaderButton>
      <HeaderButton onClick={resetGame}>Reset</HeaderButton>
    </>
  );
};

export default GameControlButtons;
