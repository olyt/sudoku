import React from 'react';
import { ButtonsWrapper, H1, StyledHeader } from './styles';
import GameControlButtons from '../Buttons/Blocks/GameControlButtons';
import FeatureButtons from '../Buttons/Blocks/FeatureButtons';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <H1>sudoku</H1>
      <ButtonsWrapper>
        <FeatureButtons />
        <GameControlButtons />
      </ButtonsWrapper>
    </StyledHeader>
  );
};

export default Header;
