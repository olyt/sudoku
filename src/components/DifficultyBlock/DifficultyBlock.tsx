import React from 'react';
import { EDifficulties } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { startGame } from '../../context/operations';
import { EModalComponents } from '../../context/types';
import ModalButton from '../Buttons/ModalButton';
import { setModalComponent, setModalIsOpen } from '../../context/modal/actions';

const DifficultyBlock: React.FC = () => {
  const { dispatch } = useAppContext();

  const startNewGame: (difficulty: EDifficulties) => void = (difficulty) => {
    dispatch(startGame(difficulty));
    dispatch(setModalIsOpen(false));
    dispatch(setModalComponent(EModalComponents.Empty));
  };

  const generateButtons = (): JSX.Element[] => {
    return Object.values(EDifficulties).map((difficulty) => {
      const text = difficulty
        .charAt(0)
        .toUpperCase()
        .concat(difficulty.substring(1));
      return (
        <ModalButton key={difficulty} onClick={() => startNewGame(difficulty)}>
          {text}
        </ModalButton>
      );
    });
  };
  return <>{generateButtons()}</>;
};

export default DifficultyBlock;
