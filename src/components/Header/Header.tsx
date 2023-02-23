import React, { MouseEventHandler } from 'react';
import { useAppContext } from '../../context/AppContext';
import { EGameStatus, EModalComponents } from '../../context/types';
import { ButtonsWrapper, H1, StyledHeader } from './styles';
import HeaderButton from '../Buttons/HeaderButton';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import { setGameStatus } from '../../context/gameInfo/actions';
import { setBoard } from '../../context/boards/actions';

const Header: React.FC = () => {
  const { boards, gameInfo, dispatch } = useAppContext();

  const startNewGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setModalComponent(EModalComponents.DifficultyBlock));
    dispatch(setModalIsOpen(true));
  };

  const resetGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setBoard(boards.initialBoard));
    if (gameInfo.gameStatus === EGameStatus.Failed) {
      dispatch(setGameStatus(EGameStatus.InProgress));
    }
  };

  return (
    <StyledHeader>
      <H1>sudoku</H1>
      <ButtonsWrapper>
        <HeaderButton onClick={startNewGame}>New Game</HeaderButton>
        <HeaderButton onClick={resetGame}>Reset</HeaderButton>
      </ButtonsWrapper>
    </StyledHeader>
  );
};

export default Header;
