import React from 'react';
import { ButtonsWrapper, H1, StyledHeader, TechniqueButton } from './styles';
import GameControl from '../Buttons/Blocks/GameControl';
import Features from '../Buttons/Blocks/Features';
import { useAppDispatch, useGeneratorType } from '../../context/AppContext';
import { EModalComponents } from '../../context/types';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';

const Header: React.FC = () => {
    const generatorType = useGeneratorType();
    const dispatch = useAppDispatch();

    return (
        <StyledHeader>
            <TechniqueButton onClick={() => {
                dispatch(setModalComponent(EModalComponents.GeneratorsBlock)); 
                dispatch(setModalIsOpen(true)); 
            }}> 
                {generatorType}
            </TechniqueButton>
            <H1>sudoku</H1>
            <ButtonsWrapper>
                <Features />
                <GameControl />
            </ButtonsWrapper>
        </StyledHeader>
    );
};

export default React.memo(Header);
