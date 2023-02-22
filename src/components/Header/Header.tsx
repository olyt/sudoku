import React, { MouseEventHandler } from 'react';
import {
  resetBoardToInitial,
  resetGameStatus,
  setModal,
  setModalComponent,
} from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import { EGameStatus, EModalComponents } from '../../context/types';
import { ButtonsWrapper, H1, StyledHeader } from './styles';
import HeaderButton from '../Buttons/HeaderButton';

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const startNewGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setModalComponent(EModalComponents.DifficultyBlock));
    dispatch(setModal(true));
  };

  const resetGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(resetBoardToInitial(state.initialBoard));
    if (state.gameStatus === EGameStatus.Failed) {
      dispatch(resetGameStatus);
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
