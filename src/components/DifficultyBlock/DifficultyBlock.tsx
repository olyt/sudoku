import React from 'react';
import { useAppDispatch } from '../../context/AppContext';
import { startGame } from '../../context/operations';
import { EModalComponents } from '../../context/types';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import { DIFFICULTIES } from '../../utils/generateBoard';
import ModalButtonsList from '../Buttons/Blocks/ButtonsList';

const DifficultyBlock: React.FC = () => {
    const dispatch = useAppDispatch();

    const startNewGame: (difficulty: EDifficulties) => void = (difficulty) => {
        dispatch(startGame(difficulty));
        dispatch(setModalIsOpen(false));
        dispatch(setModalComponent(EModalComponents.Empty));
    };

    return (
        <ModalButtonsList
            items={Object.keys(DIFFICULTIES) as EDifficulties[]}
            clickHandler={startNewGame}
        />
    );
};

export default DifficultyBlock;
