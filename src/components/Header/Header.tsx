import React from 'react';
import { ButtonsWrapper, H1, StyledHeader } from './styles';
import GameControl from '../Buttons/Blocks/GameControl';
import Features from '../Buttons/Blocks/Features';

const Header: React.FC = () => {
    return (
        <StyledHeader>
            <H1>sudoku</H1>
            <ButtonsWrapper>
                <Features />
                <GameControl />
            </ButtonsWrapper>
        </StyledHeader>
    );
};

export default Header;
