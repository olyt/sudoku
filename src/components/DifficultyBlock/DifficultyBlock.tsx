import React from 'react';
import { useAppDispatch } from '../../context/AppContext';
import { startGame } from '../../context/operations';
import { EModalComponents } from '../../context/types';
import ModalButton from '../Buttons/ModalButton';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';
import { DIFFICULTIES } from '../../utils/generateBoard';

const DifficultyBlock: React.FC = () => {
    const dispatch = useAppDispatch();

    const startNewGame: (difficulty: EDifficulties) => void = (difficulty) => {
        dispatch(startGame(difficulty));
        dispatch(setModalIsOpen(false));
        dispatch(setModalComponent(EModalComponents.Empty));
    };

    const generateButtons = (): JSX.Element[] => {
        return (Object.keys(DIFFICULTIES) as EDifficulties[]).map((difficulty) => {
            const text = difficulty
                .charAt(0)
                .toUpperCase()
                .concat(difficulty.substring(1));

            return (
                <ModalButton
                    key={difficulty}
                    onClick={() => startNewGame(difficulty)}
                >
                    {text}
                </ModalButton>
            );
        });
    };

    return <>{generateButtons()}</>;
};

export default DifficultyBlock;
