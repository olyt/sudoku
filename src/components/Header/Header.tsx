import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import {
  resetBoardToInitial,
  resetGameStatus,
  setModal,
  setModalComponent,
} from '../../context/actions';
import { useAppContext } from '../../context/AppContext';
import { aliceBlue, ming } from '../../utils/COLORS';
import { EGameStatus, EModalComponents } from '../../context/types';

const StyledHeader = styled.header`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: 100px;
  border: 0;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  align-items: center;
  background: rgb(0, 109, 119);
  background: linear-gradient(
    180deg,
    rgba(0, 109, 119, 1) 0%,
    rgba(131, 197, 190, 1) 60%,
    rgba(237, 246, 249, 0.4) 100%
  );
`;

const StyledH1 = styled.h1`
  text-transform: uppercase;
  font-size: 30px;
  grid-column-start: 2;
  justify-self: center;
  letter-spacing: 10px;
  color: ${aliceBlue};
`;

const HeaderButton = styled.button`
  box-sizing: border-box;
  font-size: 18px;
  height: 100%;
  width: 130px;
  //border-radius: 10px;
  color: ${aliceBlue};
  //background: ${aliceBlue};
  background: transparent;
  grid-column-start: 3;
  max-width: 30%;
  transition: 0.3s;

  &:hover {
    //border-radius: 40px;
    color: ${ming};
    background: ${aliceBlue};
    //border-top: ${ming} solid 10px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const startNewGame: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(setModalComponent(EModalComponents.DifficultyButtons));
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
      <StyledH1>sudoku</StyledH1>
      <BtnBox>
        <HeaderButton onClick={startNewGame}>New Game</HeaderButton>
        <HeaderButton onClick={resetGame}>Reset</HeaderButton>
      </BtnBox>
    </StyledHeader>
  );
};

export default Header;
