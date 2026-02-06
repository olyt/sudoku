import React, { MouseEventHandler } from 'react';
import HeaderButton from '../HeaderButton';
import { useAppContext } from '../../../context/AppContext';
import {
    setModalComponent,
    setModalIsOpen,
} from '../../../context/modal/actions';
import { EModalComponents } from '../../../context/types';
import { resetGame } from '../../../context/operations';

const GameControl: React.FC = () => {
    const { dispatch } = useAppContext();

    const onNewGameClick: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(setModalComponent(EModalComponents.DifficultyBlock));
        dispatch(setModalIsOpen(true));
    };

    const onResetClick: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(resetGame());
    };

    return (
        <>
            <HeaderButton onClick={onNewGameClick}>New Game</HeaderButton>
            <HeaderButton onClick={onResetClick}>Reset</HeaderButton>
        </>
    );
};

export default GameControl;
